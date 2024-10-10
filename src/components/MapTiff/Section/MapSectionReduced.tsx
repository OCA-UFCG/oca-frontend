"use-client";

import { Suspense, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import { MapContainer } from "./MapsSections.styles";

export const MapPageWrapper = ({
  mapsData,
  ImgData,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
}) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapSection mapsData={mapsData} ImgData={ImgData} />
  </Suspense>
);

export const MapSection = ({
  mapsData,
  ImgData,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
}) => {
  const [loadingMap, setLoadingMap] = useState<boolean>(false);

  return (
    <MapTemplate>
      <MapContainer>
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
