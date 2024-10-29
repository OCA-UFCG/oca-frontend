import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { IEEInfo, IMapId } from "@/utils/interfaces";
import type { NextRequest } from "next/server";
import { getContent } from "@/utils/functions";

const cacheUrls = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name") || "";
    const year = req.nextUrl.searchParams.get("year") || "";

    if (cacheUrls.has(name + year)) {
      console.log("Cache hit");
      const url = cacheUrls.get(name + year);

      return NextResponse.json({ url }, { status: 200 });
    } else {
      console.log("Cache miss");
      const imageInfo: IEEInfo = await req.json();
      const url = await getEarthEngineUrl(
        imageInfo.imageData[year].imageId,
        imageInfo.imageData[year].imageParams,
        imageInfo.minScale,
        imageInfo.maxScale,
      );
      cacheUrls.set(name + year, url);

      return NextResponse.json({ url }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

const cacheMapData = async () => {
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
      cacheUrls.set(id + year, url);
    });
  });

  setInterval(
    () => {
      cacheMapData();
    },
    1000 * 60 * 60 * 24,
  ); // 24 hours

  console.log("Cache updated");
};

const getEarthEngineUrl = async (
  imageId: any,
  imageParams: any,
  minScale: any,
  maxScale: any,
) => {
  await authenticate();

  // console.log(imageId, imageParams, minScale, maxScale);

  const GEEImage = ee.Image(imageId).selfMask();
  const { categorizedImage, visParams } = getImageScale(
    GEEImage,
    imageParams,
    minScale,
    maxScale,
  );
  const mapId: IMapId = (await getMapId(categorizedImage, visParams)) as IMapId;

  return mapId.urlFormat;
};

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

function getMapId(image: any, visParams?: any) {
  return new Promise((resolve, reject) => {
    image.getMapId(visParams, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}

cacheMapData();
