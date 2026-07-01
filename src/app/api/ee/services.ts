import ee from "@google/earthengine";
import { createSign } from "node:crypto";
import { IMapId } from "@/utils/interfaces";
import { getContent } from "@/utils/functions";

// ====== GEE Singleton for Authentication and Initialization ======

let geeInitialized: Promise<void> | null = null;

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GEE_AUTH_SCOPES = [
  "https://www.googleapis.com/auth/earthengine",
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/devstorage.read_write",
];

interface GeeServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

function parseGeeCredentials(rawCredentials: string) {
  const parsed = JSON.parse(
    rawCredentials,
  ) as Partial<GeeServiceAccountCredentials>;

  if (
    typeof parsed.client_email !== "string" ||
    !parsed.client_email.trim() ||
    typeof parsed.private_key !== "string" ||
    !parsed.private_key.includes("BEGIN PRIVATE KEY")
  ) {
    throw new Error(
      "GEE_PRIVATE_KEY must contain valid client_email and private_key fields.",
    );
  }

  return parsed as GeeServiceAccountCredentials;
}

async function fetchGoogleOAuthToken(
  credentials: GeeServiceAccountCredentials,
) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const encodedHeader = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" }),
  ).toString("base64url");
  const encodedPayload = Buffer.from(
    JSON.stringify({
      iss: credentials.client_email,
      scope: GEE_AUTH_SCOPES.join(" "),
      aud: GOOGLE_OAUTH_TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  ).toString("base64url");
  const unsignedJwt = `${encodedHeader}.${encodedPayload}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedJwt)
    .end()
    .sign(credentials.private_key, "base64url");

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedJwt}.${signature}`,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  const body = await response.json();

  if (!response.ok || typeof body.access_token !== "string") {
    const oauthError =
      typeof body.error === "string" ? body.error : `HTTP ${response.status}`;
    const description =
      typeof body.error_description === "string"
        ? `: ${body.error_description}`
        : "";
    throw new Error(
      `Google OAuth token exchange failed (${oauthError}${description}).`,
    );
  }

  return {
    accessToken: body.access_token as string,
    expiresIn: typeof body.expires_in === "number" ? body.expires_in : 3600,
    tokenType: typeof body.token_type === "string" ? body.token_type : "Bearer",
  };
}

function configureGeeTokenRefresh(credentials: GeeServiceAccountCredentials) {
  ee.data.setAuthTokenRefresher(
    (
      _authArgs: unknown,
      callback: (result: Record<string, unknown>) => void,
    ) => {
      void fetchGoogleOAuthToken(credentials)
        .then((token) => {
          callback({
            access_token: token.accessToken,
            token_type: token.tokenType,
            expires_in: token.expiresIn,
          });
        })
        .catch((error: unknown) => callback({ error }));
    },
  );
}

/**
 * Ensures that Google Earth Engine is authenticated and initialized, but only runs the process once.
 * This is a singleton pattern to prevent re-authentication on every API call.
 */
const initializeGee = async () => {
  if (geeInitialized) {
    return geeInitialized;
  }
  geeInitialized = authenticateAndInitialize().catch((error) => {
    geeInitialized = null;
    throw error;
  });

  return geeInitialized;
};

// ====== GEE ======

/**
 * Fetches a URL for an Earth Engine image with given parameters.
 * @param {any} imageId - ID of the Earth Engine image.
 * @param {any} imageParams - Visualization parameters for the image.
 * @param {any} minScale - Minimum scale for the visualization.
 * @param {any} maxScale - Maximum scale for the visualization.
 * @returns {Promise<string>} - The formatted URL for the image.
 */
export const getEarthEngineUrl = async (
  imageId: any,
  imageParams: any,
  minScale: any,
  maxScale: any,
) => {
  try {
    await initializeGee();
    console.log(new Date().toISOString(), " - GEE Initialized successfully");

    const GEEImage = ee
      .Image(imageId)
      .selfMask()
      .reduceResolution(ee.Reducer.mode(), true, 128);
    const { categorizedImage, visParams } = getImageScale(
      GEEImage,
      imageParams,
      minScale,
      maxScale,
    );
    const mapId = (await getMapId(categorizedImage, visParams)) as IMapId;

    if (!mapId?.urlFormat) {
      throw new Error("Google Earth Engine did not return a tile URL.");
    }

    return mapId.urlFormat;
  } catch (error: any) {
    console.error("Error in getEarthEngineUrl:", error.message);
    throw error;
  }
};

/**
 * Adjusts the scale of an image based on visualization parameters.
 * This function applies category limits based on pixel values
 * and assigns colors to different categories if there are pixel limits.
 *
 * @param {object} image - The Earth Engine image.
 * @param {Array} imageParams - Array of parameters containing pixel limits and colors.
 * @param {number} minScale - Minimum scale for visualization.
 * @param {number} maxScale - Maximum scale for visualization.
 * @returns {object} - The categorized image and visualization parameters.
 */
const getImageScale = (
  image: any,
  imageParams: Array<any>,
  minScale: number,
  maxScale: number,
) => {
  const hasPixelLimits = imageParams.some(
    (imageParam: any) => imageParam.pixelLimit,
  );

  let categorizedImage = image;

  if (hasPixelLimits) {
    for (let index = 0; index < imageParams.length; index++) {
      const lowerLimit =
        index > 0 ? imageParams[index - 1].pixelLimit : Number.MIN_SAFE_INTEGER;

      const upperLimit =
        index < imageParams.length - 1
          ? imageParams[index].pixelLimit
          : Number.MAX_SAFE_INTEGER;

      categorizedImage = categorizedImage.where(
        image.gt(lowerLimit).and(image.lte(upperLimit)),
        index + 1,
      );
    }
  }

  const palette = imageParams.map((imageParam: any) => imageParam.color);

  const visParams = {
    min: minScale ?? 0,
    max: maxScale ?? 1,
    palette,
  };

  return { categorizedImage, visParams };
};

/**
 * Retrieves the map ID for the given image with visualization parameters.
 * @param {any} image - The Earth Engine image.
 * @param {any} visParams - Visualization parameters for the image.
 * @returns {Promise<Object>} - The map ID object.
 */
function getMapId(image: any, visParams?: any) {
  return new Promise((resolve, reject) => {
    image.getMapId(visParams, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}

/**
 * Authenticates and initializes Google Earth Engine using a private key.
 * This function should only be called by the `initializeGee` singleton.
 * @returns {Promise<void>} - Resolves when initialization is successful.
 */
async function authenticateAndInitialize(): Promise<void> {
  const key = process.env.GEE_PRIVATE_KEY;
  if (!key) {
    throw new Error("GEE_PRIVATE_KEY environment variable not set.");
  }

  const credentials = parseGeeCredentials(key);
  const token = await fetchGoogleOAuthToken(credentials);

  ee.data.setAuthToken(
    credentials.client_email,
    token.tokenType,
    token.accessToken,
    token.expiresIn,
    GEE_AUTH_SCOPES,
    undefined,
    false,
    true,
  );
  configureGeeTokenRefresh(credentials);

  await new Promise<void>((resolve, reject) => {
    ee.initialize(null, null, resolve, reject);
  });
}

// ====== Cache ======
const TTL = 1000 * 60 * 30; // 0.5 hour in milliseconds

interface CacheEntry {
  url: string;
  timestamp: number;
}

const cacheUrls = new Map<string, CacheEntry>();
let cacheWarmupStarted = false;

/**
 * Checks if a given key exists in cache.
 * @param {string} key - The unique key to be search in the cache.
 * @returns {boolean} - True if the key exists, false otherwise.
 */
export const hasKey = (key: string) => {
  const entry = cacheUrls.get(key);
  if (!entry) {
    return false;
  }

  // Check if the entry has expired
  const expired = Date.now() - entry.timestamp > TTL;
  if (expired) {
    cacheUrls.delete(key); // Clean up expired entry
  }

  return !expired;
};

/**
 * Retrieves the caches URL for a given key.
 * @param {string} key - The unique key that refers to the URL to be returned.
 * @return {string | undefined} - The cached URL or undefined if the url is not present or has expired.
 */
export const getCachedUrl = (key: string) => {
  // The hasKey function also handles expiration checks and cleanup
  return cacheUrls.get(key)?.url || undefined;
};

/**
 * Removes a URL from the cache for a given key.
 * @param {string} key - The unique key that refers to the URL to be removed.
 */
export const removeCacheUrl = (key: string) => cacheUrls.delete(key);

/**
 * Adds a url to the cache, based on a key composed by the name and year of the map visualization.
 * @param {string} key - The unique key that refers to the URL to be returned.
 * @param {string} url - The URL to cache.
 */
export const addUrlToCache = (key: string, url: string | null) => {
  if (url) {
    const entry: CacheEntry = { url, timestamp: Date.now() };
    cacheUrls.set(key, entry);
  } else {
    cacheUrls.delete(key);
  }
};

/**
 * Fetches and caches map data from Contentful/GEE API sources.
 * Runs recursively every 12 hours to keep the cache updated.
 */
export const cacheMapData = async () => {
  const { tiffInfo } = await getContent(["tiffInfo"]);

  for (const data of tiffInfo) {
    const id = data.id;
    const imageData = data.imageData;
    const minScale = data.minScale;
    const maxScale = data.maxScale;

    if (!imageData || typeof imageData !== "object") {
      continue;
    }

    for (const year of Object.keys(imageData)) {
      const { imageId, imageParams } = imageData[year];
      const url = await getEarthEngineUrl(
        imageId,
        imageParams,
        minScale,
        maxScale,
      );
      addUrlToCache(id + year, url);
    }
  }
};

export const ensureCacheWarmupStarted = () => {
  if (cacheWarmupStarted) {
    return;
  }

  cacheWarmupStarted = true;
  const warmCache = () => {
    void cacheMapData().catch((error) => {
      console.error("Error warming Earth Engine URL cache:", error);
    });
  };

  warmCache();
  setInterval(warmCache, 1000 * 60 * 60 * 12);
};
