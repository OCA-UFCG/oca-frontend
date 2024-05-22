import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { EEImages } from "@/utils/constants";
import { IMapId } from "@/utils/interfaces";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const key = process.env.NEXT_PUBLIC_EE || "";

    await authenticate(key);

    const nameImage = req.nextUrl.searchParams.get("nameImage") || "undefined";
    const yearImage = req.nextUrl.searchParams.get("yearImage") || "undefined";

    const visParams = {
      min: EEImages[nameImage].minScale ?? 0,
      max: EEImages[nameImage].maxScale ?? 1,
      palette: EEImages[nameImage].pallete ?? ["black", "white"],
    };

    const imageId = EEImages[nameImage].imageData[yearImage]?.imageId;
    const image = ee.Image(imageId);
    const mapId: IMapId = (await getMapId(image, visParams)) as IMapId;
    const url = mapId.urlFormat;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 404 });
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
