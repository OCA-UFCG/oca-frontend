"use-client";

import { Suspense, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import { MapContainer } from "./MapsSections.styles";

const MapPageWrapper = ({
  mapsData,
  ImgData,
  isReduced,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
  isReduced: boolean;
}) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapSection mapsData={mapsData} ImgData={ImgData} isReduced={isReduced} />
  </Suspense>
);

export const MapSection = ({
  mapsData,
  ImgData,
  isReduced,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
  isReduced: boolean;
}) => {
  const [loadingMap, setLoadingMap] = useState<boolean>(false);

  return (
    <MapTemplate>
      <MapContainer isReduced={isReduced}>
        <MapTiff
          mapsData={mapsData}
          data={ImgData}
          loading={loadingMap}
          setLoading={setLoadingMap}
          isReduced={true}
        />
      </MapContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
