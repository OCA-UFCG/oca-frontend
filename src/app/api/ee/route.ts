import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { EEImages } from "@/utils/constants";
import { IMapId } from "@/utils/interfaces";
import type { NextRequest } from "next/server";
import { formatPalette } from "@/utils/functions";

export async function GET(req: NextRequest) {
  try {
    const key = process.env.NEXT_PUBLIC_GEE_PRIVATE_KEY || "";

    await authenticate(key);

    const name = req.nextUrl.searchParams.get("name") || "";
    const year = req.nextUrl.searchParams.get("year") || "";

    const imageInfo = EEImages[name];
    const imageId = EEImages[name].imageData[year]?.imageId;
    let imageParams = EEImages[name].imageData[year]?.pallete || [];
    const colorNumbers = EEImages[name].imageData[year]?.colorNumbers || null;

    if (colorNumbers) {
      imageParams = formatPalette(imageParams, colorNumbers);
    }

    const visParams = {
      min: imageInfo?.minScale ?? 0,
      max: imageInfo?.maxScale ?? 1,
      palette: imageParams ?? ["black", "white"],
    };

    const image = ee.Image(imageId).selfMask();
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
