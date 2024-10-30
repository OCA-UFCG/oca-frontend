import ee from "@google/earthengine";
import { IMapId } from "@/utils/interfaces";
import { getContent } from "@/utils/functions";

let cached = false;

// create cache map
const cacheUrls = new Map<string, string>();

export const hasKey = (key: string) => {
  return cacheUrls.has(key);
};

export const getCachedUrl = (key: string) => {
  return cacheUrls.get(key);
};

export const addUrlToCache = (key: string, url: string) => {
  cacheUrls.set(key, url);
};

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
    1000 * 60 * 60 * 24,
  ); // 24 hours
};

export const getEarthEngineUrl = async (
  imageId: any,
  imageParams: any,
  minScale: any,
  maxScale: any,
) => {
  await authenticate();

  // console.log(imageId, imageParams, minScale, maxScale);

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
  const mapId: IMapId = (await getMapId(categorizedImage, visParams)) as IMapId;

  return mapId.urlFormat;
};

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

const getImageScale = (
  image: any,
  imageParams: any,
  minScale: any,
  maxScale: any,
) => {
  const filteredImageParams = imageParams.filter(
    (imageParam: any) => imageParam.pixelLimit,
  );

  let categorizedImage = image;
  if (filteredImageParams.length > 0) {
    categorizedImage = image.where(
      image.lte(filteredImageParams[0].pixelLimit),
      1,
    );

    for (let index = 1; index < filteredImageParams.length; index++) {
      categorizedImage = categorizedImage.where(
        image
          .gt(filteredImageParams[index - 1].pixelLimit)
          .and(image.lte(filteredImageParams[index].pixelLimit)),
        index + 1,
      );
    }

    categorizedImage = categorizedImage.where(
      image.gt(filteredImageParams[filteredImageParams.length - 1].pixelLimit),
      filteredImageParams.length + 1,
    );
  }

  const palette = imageParams.map((imageParam: any) => imageParam.color);
  const visParams = {
    min: minScale ?? 0,
    max: maxScale ?? 1,
    palette,
  };

  return { categorizedImage, visParams };
};

function getMapId(image: any, visParams?: any) {
  return new Promise((resolve, reject) => {
    image.getMapId(visParams, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}

if (!cached) cacheMapData();
