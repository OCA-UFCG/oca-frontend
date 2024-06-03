import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { EEImages } from "@/utils/constants";
import { IMapId } from "@/utils/interfaces";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const key = process.env.NEXT_PUBLIC_GEE_PRIVATE_KEY || "";

    await authenticate(key);

    const name = req.nextUrl.searchParams.get("name") || "";
    const year = req.nextUrl.searchParams.get("year") || "";

    const imageInfo = EEImages[name];
    const { imageId, imageParams } = imageInfo.imageData[year];
    let image = ee.Image(imageId).selfMask();

    const filteredImageParams = imageParams.filter(
      (imageParam) => imageParam.pixelLimit,
    );

    if (filteredImageParams.length > 0) {
      let categorizedImage = image.where(
        image.lte(filteredImageParams[0].pixelLimit),
        1,
      );

      let lastIndex = filteredImageParams.length - 1;
      for (let index = 1; index < filteredImageParams.length; index++) {
        if (!filteredImageParams[index].pixelLimit && index < lastIndex) {
          lastIndex = index;
        } else {
          categorizedImage = categorizedImage.where(
            image
              .gt(filteredImageParams[index - 1].pixelLimit)
              .and(image.lte(filteredImageParams[index].pixelLimit)),
            index + 1,
          );
        }
      }

      categorizedImage = categorizedImage.where(
        image.gt(filteredImageParams[lastIndex].pixelLimit),
        lastIndex + 2,
      );
      image = categorizedImage;
    }

    const palette = imageParams.map((imageParam) => imageParam.color);
    const visParams = {
      min: imageInfo?.minScale ?? 0,
      max: imageInfo?.maxScale ?? 1,
      palette,
    };

    const mapId: IMapId = (await getMapId(image, visParams)) as IMapId;
    const url = mapId.urlFormat;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

function authenticate(key: string) {
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
