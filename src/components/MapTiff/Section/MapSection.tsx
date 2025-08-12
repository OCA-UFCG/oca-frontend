"use client";

import { Suspense, useContext, useMemo } from "react";
import { IEEInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import {
  HeaderWrapper,
  HomeImage,
  MapContainer,
  MapLegendContainer,
  MenuWrapper,
  NameContainer,
  QuestionImage,
  QuestionWrapper,
  VisuName,
} from "./MapsSections.styles";
import { MapTiffContext, MapTiffProvider } from "@/contexts/MapContext";
import Link from "next/link";
import { MapLegend } from "@/components/MapLegend/MapLegend";
import MapDescription from "@/components/MapDescription/MapDescription";

const MapPageWrapper = ({ tiffs }: { tiffs: IEEInfo[] }) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapTiffProvider tiffs={tiffs}>
      <MapSection />
    </MapTiffProvider>
  </Suspense>
);

export const MapSection = () => {
  const {
    currentVisu,
    tiffs,
    setDescRetracted,
    currentDescription,
    setCurrentDescription,
    descRetracted,
  } = useContext(MapTiffContext);

  const currentTiff = useMemo(
    () => tiffs.find((tiff) => tiff.id === currentVisu.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVisu.id],
  );
  const handleDescUpdate = () => {
    setDescRetracted(!descRetracted);

    if (currentDescription.name === currentTiff?.name) {
      setDescRetracted(!descRetracted);
    } else {
      setDescRetracted(false);
      setCurrentDescription({
        name: currentTiff?.name || "",
        description: currentTiff?.description || "",
      });
    }
  };

  return (
    <MapTemplate>
      <MapContainer $isReduced={false}>
        <MapTiff />
      </MapContainer>
      <MapDescription />
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu />
          <Link href="/">
            <HomeImage id="home" size={16} />
          </Link>
        </MenuWrapper>
        <NameContainer>
          <VisuName>{currentTiff?.name}</VisuName>
          <QuestionWrapper
            onClick={handleDescUpdate}
            title={`Sobre ${currentTiff?.name}`}
          >
            <QuestionImage id="question" height={20} width={20} />
          </QuestionWrapper>
        </NameContainer>
      </HeaderWrapper>
      <MapLegendContainer>
        <MapLegend />
      </MapLegendContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
