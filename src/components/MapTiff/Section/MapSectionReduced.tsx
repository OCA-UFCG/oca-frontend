"use-client";

import { Suspense } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import { MapContainer } from "./MapsSections.styles";

const MapPageWrapper = ({
  mapsData,
  ImgData,
  isReduced,
  isLoading,
  setLoading,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
  isReduced: boolean;
  isLoading: boolean;
  setLoading: (e: boolean) => void;
}) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapSection
      mapsData={mapsData}
      ImgData={ImgData}
      isReduced={isReduced}
      isLoading={isLoading}
      setLoading={setLoading}
    />
  </Suspense>
);

export const MapSection = ({
  mapsData,
  ImgData,
  isReduced,
  isLoading,
  setLoading,
}: {
  mapsData: { fields: IEEInfo }[];
  ImgData: IMapInfo;
  isReduced: boolean;
  isLoading: boolean;
  setLoading: (e: boolean) => void;
}) => {
  return (
    <MapTemplate>
      <MapContainer isReduced={isReduced}>
        <MapTiff
          mapsData={mapsData}
          data={ImgData}
          loading={isLoading}
          setLoading={setLoading}
          isReduced={true}
        />
      </MapContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
