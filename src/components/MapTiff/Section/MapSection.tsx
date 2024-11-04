"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import { defaultEEInfo } from "@/utils/constants";
import {
  HeaderWrapper,
  HomeImage,
  MapContainer,
  MenuWrapper,
} from "./MapsSections.styles";
import { MapTiffContext, MapTiffProvider } from "@/contexts/MapContext";
import Link from "next/link";

const DEFAULT_TIFF = "spei";

const MapPageWrapper = ({ tiffs }: { tiffs: { fields: IEEInfo }[] }) => (
  <MapTiffProvider tiffs={tiffs}>
    <Suspense fallback={<div>Carregando...</div>}>
      <MapSection />
    </Suspense>
  </MapTiffProvider>
);

export const MapSection = () => {
  const { tiffs, loading } = useContext(MapTiffContext);
  const searchParams = useSearchParams();
  const [imageData, setImageData] = useState<IMapInfo>({
    name: searchParams?.get("name") ?? DEFAULT_TIFF,
    year: searchParams?.get("year") ?? "general",
  });

  const [descriptionInfo, setDescriptionInfo] =
    useState<IEEInfo>(defaultEEInfo);

  const [isDescRetracted, setIsDescRetracted] = useState<boolean>(true);

  const handleDescUpdate = useCallback(
    (name: string, retract: boolean = true) => {
      if (retract) {
        if (name === descriptionInfo.id) {
          setIsDescRetracted(!isDescRetracted);
        } else {
          setIsDescRetracted(false);
        }
      }
      setDescriptionInfo(
        tiffs.filter(
          (data: { fields: { id: string } }) => data.fields.id === name,
        )[0].fields,
      );
    },
    [descriptionInfo.id, isDescRetracted, tiffs],
  );

  useEffect(() => {
    if (!tiffs || tiffs.length === 0) return;

    let { name, year } = imageData;

    const filteredData = tiffs.find(
      (data: { fields: { id: string } }) => data.fields.id === name,
    );

    if (!filteredData) {
      name = DEFAULT_TIFF;
    }

    if (
      filteredData &&
      !tiffs.find(
        (data: { fields: { id: string; imageData: {} } }) =>
          (name === data.fields.id && year) ||
          "" in Object.keys(data.fields.imageData),
      )
    ) {
      year = Object.keys(filteredData?.fields?.imageData)[0];
    }

    setImageData({ name, year });
    filteredData && setDescriptionInfo(filteredData?.fields);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapTemplate>
      <MapContainer isReduced={false}>
        <MapTiff />
      </MapContainer>
      {/* <MapDescription
        imageInfo={descriptionInfo}
        retracted={isDescRetracted}
        setRetracted={setIsDescRetracted}
      /> */}
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu isLoading={loading} updateDescription={handleDescUpdate} />
          <Link href="/">
            <HomeImage id="home" size={16} />
          </Link>
        </MenuWrapper>
        {/* {imageData.name && (
          <NameContainer>
            <VisuName>
              {capitalize(
                tiffs.filter(
                  (data: { fields: { id: string } }) =>
                    data.fields.id === imageData.name
                )[0].fields.name
              )}
            </VisuName>
            <QuestionWrapper
              onClick={() => handleDescUpdate(imageData.name)}
              title={`Sobre ${tiffs.filter((data: { fields: { id: string } }) => data.fields.id === imageData.name)[0].fields.name}`}
            >
              <QuestionImage id="question" height={20} width={20} />
            </QuestionWrapper>
          </NameContainer>
        )} */}
      </HeaderWrapper>
      {/* <MapLegendContainer>
        {imageData.name && (
          <MapLegend
            imageInfo={
              tiffs.filter(
                (data: { fields: { id: string } }) =>
                  data.fields.id === imageData.name
              )[0].fields
            }
            year={imageData.year || "general"}
          />
        )}
      </MapLegendContainer> */}
    </MapTemplate>
  );
};

export default MapPageWrapper;
