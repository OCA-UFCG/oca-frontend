import ee from "@google/earthengine"; // GEE library for using the API
import { IMapId } from "@/utils/interfaces"; // Interface for the map's data
import { getContent } from "@/utils/functions"; // Function responsible to fetch Contentful's Tiffs data

// Keeps track of the initialization of the cache. It is set to true when the first "cacheMapData" is executed.
let cached = false;

// create cache map
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
export const addUrlToCache = (key: string, url: string) => {
  cacheUrls.set(key, url);
};

/**
 * Fetches and caches map data from Contentful/GEE API sources.
 * Runs recursively every 12 hours to keep the cache updated.
 */
export const cacheMapData = async () => {
  cached = true; // Mark cache as initialized
  const { tiffInfo } = await getContent(["tiffInfo"]); // Fetch Contenful Map's Tiffs

  // Loop through each TIFF data (map visualization) and cache URLs for all available year of each one of those visualizations.
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
      addUrlToCache(id + year, url); // Store the URL in cache.
    });
  });

  // Schedule cache updates every 12 hours.
  setInterval(
    () => {
      cacheMapData();
    },
    1000 * 60 * 60 * 12,
  ); // 12 hours
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
  await authenticate(); //Authenticate with GEE.

  const GEEImage = ee
    .Image(imageId)
    .selfMask()
    .reduceResolution(ee.Reducer.mode(), true, 128); // create a masked image with reduced resolution.
  const { categorizedImage, visParams } = getImageScale(
    GEEImage,
    imageParams,
    minScale,
    maxScale,
  ); // Apply scaling and visualization parameters.

  const mapId: IMapId = (await getMapId(categorizedImage, visParams)) as IMapId; // Retrieve map ID.

  return mapId.urlFormat; // Returns the URL
};

/**
 * Authenticates with Google Earth Engine using a private key.
 * @returns {Promise<void>} - Resolves when authentication is successful.
 */
function authenticate() {
  const key = process.env.NEXT_PUBLIC_GEE_PRIVATE_KEY || ""; // Retrieve private key from environment variables

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

const getImageScale = (
  image: any,
  imageParams: any,
  minScale: any,
  maxScale: any,
) => {
  // Check if any of the imageParams contain a 'pixelLimit' property
  const hasPixelLimits = imageParams.some(
    (imageParam: any) => imageParam.pixelLimit,
  );

  // Initialize categorizedImage with the original input image
  let categorizedImage = image;

  // If pixel limits are defined, iterate through imageParams to apply conditional masking
  if (hasPixelLimits) {
    for (let index = 0; index < imageParams.length; index++) {
      // Define the lower limit: use MIN_SAFE_INTEGER for the first iteration
      const lowerLimit =
        index > 0 ? imageParams[index - 1].pixelLimit : Number.MIN_SAFE_INTEGER;

      // Define the upper limit: use MAX_SAFE_INTEGER for the last iteration
      const upperLimit =
        index < imageParams.length - 1
          ? imageParams[index].pixelLimit
          : Number.MAX_SAFE_INTEGER;

      // Apply different conditions based on the current index
      switch (index) {
        case 0:
          // For the first range, mark pixels less than or equal to the upper limit
          categorizedImage = categorizedImage.where(
            image.lte(upperLimit),
            index + 1,
          );
          break;
        case imageParams.length - 1:
          // For the last range, mark pixels greater than the lower limit
          categorizedImage = categorizedImage.where(
            image.gt(lowerLimit),
            index + 1,
          );
          break;
        default:
          // For intermediate ranges, mark pixels between the lower and upper limits
          categorizedImage = categorizedImage.where(
            image.gt(lowerLimit).and(image.lte(upperLimit)),
            index + 1,
          );
          break;
      }
    }
  }

  // Extract the palette (color mapping) from the image parameters
  const palette = imageParams.map((imageParam: any) => imageParam.color);

  // Set up visualization parameters with the provided scale and palette
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

// Initialize the cache if it hasn't been initialized yet.
if (!cached) cacheMapData();
