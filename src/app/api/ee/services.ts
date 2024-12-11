import ee from "@google/earthengine";
import { IMapId } from "@/utils/interfaces";
import { getContent } from "@/utils/functions";

let cached = false;

const cacheUrls = new Map<string, string>();

/**
 * Checks if a given key exists in cache.
 * @param {string} key - The unique key to be search in the cache.
 * @returns {boolean} - True if the key exists, false otherwise.
 */
export const hasKey = (key: string) => {
  return cacheUrls.has(key);
};

/**
 * Retrieves the caches URL for a given key.
 * @param {string} key - The unique key that refers to the URL to be returned.
 * @return {string | undefined} - The cached URL or undefined if the url is not present in the cache.
 */
export const getCachedUrl = (key: string) => {
  return cacheUrls.get(key);
};

/**
 * Adds a url to the cache, based on a key composed by the name and year of the map visualization.
 * @param {string} key - The unique key that refers to the URL to be returned.
 * @param {string} url - The URL to cache.
 */
export const addUrlToCache = (key: string, url: string | null) => {
  if (url) cacheUrls.set(key, url);
  else cacheUrls.delete(key);
};

/**
 * Fetches and caches map data from Contentful/GEE API sources.
 * Runs recursively every 12 hours to keep the cache updated.
 */
export const cacheMapData = async () => {
  cached = true;
  const { tiffInfo } = await getContent(["tiffInfo"]);

  tiffInfo.forEach(async (data: any) => {
    const id = data.fields.id;
    const imageData = data.fields.imageData;
    const minScale = data.fields.minScale;
    const maxScale = data.fields.maxScale;

    Object.keys(imageData).forEach(async (year) => {
      const { imageId, imageParams } = imageData[year];
      const url = await getEarthEngineUrl(
        imageId,
        imageParams,
        minScale,
        maxScale,
      );
      addUrlToCache(id + year, url);
    });
  });

  setInterval(
    () => {
      cacheMapData();
    },
    1000 * 60 * 60 * 12,
  );
};

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
    await authenticate();

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

    const mapId: IMapId = (await getMapId(
      categorizedImage,
      visParams,
    )) as IMapId;

    return mapId.urlFormat;
  } catch (error: any) {
    console.error("Error during authentication:", error.message);

    return null;
  }
};

/**
 * Authenticates with Google Earth Engine using a private key.
 * @returns {Promise<void>} - Resolves when authentication is successful.
 */
function authenticate() {
  const key = process.env.NEXT_PUBLIC_GEE_PRIVATE_KEY || "";

  return new Promise<void>((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(
      JSON.parse(key),
      () =>
        ee.initialize(
          null,
          null,
          () => resolve(),
          (error: any) => reject(new Error(error)),
        ),
      (error: any) => reject(new Error(error)),
    );
  });
}

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

if (!cached) cacheMapData();
