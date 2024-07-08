"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import { defaultEEInfo } from "@/utils/constants";
import HomeIcon from "@/../public/homeIcon.svg";
import QuestionIcon from "@/../public/questionMark.svg";
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
} from "./styles";
import Link from "next/link";
import { capitalize } from "@/utils/functions";
import MapDescription from "@/components/MapDescription/MapDescription";
import { MapLegend } from "@/components/MapLegend/MapLegend";
import { CMSContext } from "@/contexts/ContentProvider";

const MapPageWrapper = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapPage />
  </Suspense>
);

const DEFAULT_TIFF = "spei";

const MapPage = () => {
  const searchParams = useSearchParams();

  const [loadingMap, setLoadingMap] = useState<boolean>(false);
  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "",
  });

  const { mapsData } = useContext(CMSContext);

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
        mapsData.filter((data) => data.fields.id === name)[0].fields,
      );
    },
    [descriptionInfo.id, isDescRetracted, mapsData],
  );

  const [isMenuRetracted, setIsmenuRetracted] = useState<boolean>(false);

  const handleMapClick = useCallback(() => {
    setIsmenuRetracted(true);
    setIsDescRetracted(true);
  }, [setIsmenuRetracted, setIsDescRetracted]);

  useEffect(() => {
    if (mapsData.length === 0) return;

    let name = searchParams?.get("name") ?? "spei";
    let year = searchParams?.get("year") ?? "general";

    const filteredData = mapsData.filter((data) => data.fields.id === name);
    if (filteredData.length === 0) {
      name = DEFAULT_TIFF;
    }

    if (
      mapsData &&
      mapsData.filter(
        (data) =>
          name === data.fields.id && year in Object.keys(data.fields.imageData),
      ).length == 0
    ) {
      year = Object.keys(filteredData[0].fields.imageData)[0];
    }

    setImageData({ name, year });
    setDescriptionInfo(filteredData[0].fields);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapsData]);

  return (
    <MapTemplate>
      <MapContainer>
        <MapTiff
          data={imageData}
          onClick={handleMapClick}
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
            initialValues={imageData}
            retracted={isMenuRetracted}
            setRetracted={setIsmenuRetracted}
            updateVisu={setImageData}
            onQuestionSelect={handleDescUpdate}
          />
          <Link href="/">
            <HomeImage src={HomeIcon} alt={HomeIcon} height={16} width={16} />
          </Link>
        </MenuWrapper>
        {imageData.name && (
          <NameContainer>
            <VisuName>
              {capitalize(
                mapsData.filter((data) => data.fields.id === imageData.name)[0]
                  .fields.name,
              )}
            </VisuName>
            <QuestionWrapper onClick={() => handleDescUpdate(imageData.name)}>
              <QuestionImage
                title={`Sobre ${mapsData.filter((data) => data.fields.id === imageData.name)[0].fields.name}`}
                src={QuestionIcon}
                alt={QuestionIcon}
                height={20}
                width={20}
              />
            </QuestionWrapper>
          </NameContainer>
        )}
      </HeaderWrapper>
      <MapLegendContainer>
        {imageData.name && (
          <MapLegend
            imageInfo={
              mapsData.filter((data) => data.fields.id === imageData.name)[0]
                .fields
            }
            year={imageData.year || "general"}
          />
        )}
      </MapLegendContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
