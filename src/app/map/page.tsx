import MapSection from "@/components/MapTiff/Section/MapSection";
import { REVALIDATE } from "@/utils/constants";
import { getContent } from "@/utils/contentful";
import { IEEInfo } from "@/utils/interfaces";
import { IEE_QUERY } from "@/utils/queries";

export const revalidate = REVALIDATE;

interface IMapContent {
  tiffInfoCollection: { items: IEEInfo[] };
}

const MapPage = async () => {
  const { tiffInfoCollection: tiffInfo }: IMapContent =
    await getContent(IEE_QUERY);

  return <MapSection tiffs={tiffInfo.items} />;
};

export default MapPage;
