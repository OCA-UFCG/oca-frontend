import { getContent } from "@/utils/functions";
import MapSection from "@/components/MapTiff/Section/MapSection";

const MapPage = async () => {
  const { tiffInfo } = await getContent(["tiffInfo"]);

  return <MapSection mapsData={tiffInfo} />;
};

export default MapPage;
