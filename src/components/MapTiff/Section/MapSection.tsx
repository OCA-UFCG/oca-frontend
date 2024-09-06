"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import { defaultEEInfo } from "@/utils/constants";
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
import Link from "next/link";
import { capitalize } from "@/utils/functions";
import MapDescription from "@/components/MapDescription/MapDescription";
import { MapLegend } from "@/components/MapLegend/MapLegend";

const DEFAULT_TIFF = "spei";

const MapPageWrapper = ({ mapsData }: { mapsData: any }) => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapSection mapsData={mapsData} />
  </Suspense>
);

const MapSection = ({ mapsData }: { mapsData: { fields: IEEInfo }[] }) => {
  const searchParams = useSearchParams();
  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "",
  });

  const [loadingMap, setLoadingMap] = useState<boolean>(false);
  const [descriptionInfo, setDescriptionInfo] =
    useState<IEEInfo>(defaultEEInfo);
  const [isDescRetracted, setIsDescRetracted] = useState<boolean>(true);
  const [isMenuRetracted, setIsmenuRetracted] = useState<boolean>(false);

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
        mapsData.filter(
          (data: { fields: { id: string } }) => data.fields.id === name,
        )[0].fields,
      );
    },
    [descriptionInfo.id, isDescRetracted, mapsData],
  );

  const handleMapClick = useCallback(() => {
    setIsmenuRetracted(true);
    setIsDescRetracted(true);
  }, [setIsmenuRetracted, setIsDescRetracted]);

  useEffect(() => {
    if (!mapsData || mapsData.length === 0) return;

    let name = searchParams?.get("name") ?? DEFAULT_TIFF;
    let year = searchParams?.get("year") ?? "general";

    const filteredData = mapsData.find(
      (data: { fields: { id: string } }) => data.fields.id === name,
    );

    if (!filteredData) {
      name = DEFAULT_TIFF;
    }

    if (
      filteredData &&
      !mapsData.find(
        (data: { fields: { id: string; imageData: {} } }) =>
          name === data.fields.id && year in Object.keys(data.fields.imageData),
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
      <MapContainer>
        <MapTiff
          data={imageData}
          onClick={handleMapClick}
          loading={loadingMap}
          setLoading={setLoadingMap}
        />
      </MapContainer>
      <MapDescription
        imageInfo={descriptionInfo}
        retracted={isDescRetracted}
        setRetracted={setIsDescRetracted}
      />
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu
            isLoading={loadingMap}
            mapsData={mapsData}
            initialValues={imageData}
            retracted={isMenuRetracted}
            setRetracted={setIsmenuRetracted}
            updateVisu={setImageData}
            onQuestionSelect={handleDescUpdate}
          />
          <Link href="/">
            <HomeImage id="home" size={16} />
          </Link>
        </MenuWrapper>
        {imageData.name && (
          <NameContainer>
            <VisuName>
              {capitalize(
                mapsData.filter(
                  (data: { fields: { id: string } }) =>
                    data.fields.id === imageData.name,
                )[0].fields.name,
              )}
            </VisuName>
            <QuestionWrapper
              onClick={() => handleDescUpdate(imageData.name)}
              title={`Sobre ${mapsData.filter((data: { fields: { id: string } }) => data.fields.id === imageData.name)[0].fields.name}`}
            >
              <QuestionImage id="question" height={20} width={20} />
            </QuestionWrapper>
          </NameContainer>
        )}
      </HeaderWrapper>
      <MapLegendContainer>
        {imageData.name && (
          <MapLegend
            imageInfo={
              mapsData.filter(
                (data: { fields: { id: string } }) =>
                  data.fields.id === imageData.name,
              )[0].fields
            }
            year={imageData.year || "general"}
          />
        )}
      </MapLegendContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
