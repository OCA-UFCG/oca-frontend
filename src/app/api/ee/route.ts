import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { EEImages } from "@/utils/constants";

export async function GET() {
  try {
    const key = process.env.NEXT_PUBLIC_EE || "";

    await authenticate(key);

    const image = ee.Image(EEImages.gpp_21.imageId);
    const mapId = await getMapId(image);

    return NextResponse.json({ mapId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 404 });
  }
}

function authenticate(key: string) {
  return new Promise<void>((resolve, reject) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  });
}

function getMapId(image: ee.Image) {
  return new Promise((resolve, reject) => {
    image.getMapId(null, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}
