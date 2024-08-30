import { getContent } from "@/utils/functions";
import MapPageWrapper from "@/components/MapTiff/Section/MapSection";

const MapPage = async () => {
  const { tiffInfo } = await getContent(["tiffInfo"]);

  return <MapPageWrapper mapsData={tiffInfo} />;
};

export default MapPage;
