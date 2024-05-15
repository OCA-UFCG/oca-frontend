import ee from "@google/earthengine";
import { NextResponse } from "next/server";
import { EEImages } from "@/utils/constants";
import { IMapId } from "@/utils/interfaces";

export async function GET() {
  try {
    const key = process.env.NEXT_PUBLIC_EE || "";

    await authenticate(key);

    const imagesUrl: { [key: string]: string } = {};

    const getUrls = async () => {
      for (const key in EEImages) {
        const image = ee.Image(EEImages[key].imageId);
        const mapId: IMapId = (await getMapId(image)) as IMapId;
        const url = mapId.urlFormat;
        imagesUrl[key] = url;
      }
    };

    await getUrls();

    return NextResponse.json({ imagesUrl }, { status: 200 });
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

function getMapId(image: any) {
  return new Promise((resolve, reject) => {
    image.getMapId(null, (obj: any, error: any) =>
      error ? reject(new Error(error)) : resolve(obj),
    );
  });
}
