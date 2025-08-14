import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IEEInfo } from "@/utils/interfaces";
import {
  addUrlToCache,
  getEarthEngineUrl,
  hasKey,
  getCachedUrl,
} from "@/app/api/ee/services";

export async function POST(req: NextRequest) {
  try {
    const name = req.nextUrl.searchParams.get("name") || "";
    const year = req.nextUrl.searchParams.get("year") || "";

    if (hasKey(name + year)) {
      const url = getCachedUrl(name + year);

      return NextResponse.json({ url }, { status: 200 });
    } else {
      const imageInfo: IEEInfo = await req.json();
      const url = await getEarthEngineUrl(
        imageInfo.imageData[year].imageId,
        imageInfo.imageData[year].imageParams,
        imageInfo.minScale,
        imageInfo.maxScale,
      );
      addUrlToCache(name + year, url);

      return NextResponse.json({ url }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
