"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import { EEImages, defaultEEInfo } from "@/utils/constants";
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
  VisuName,
} from "./styles";
import Link from "next/link";
import { capitalize } from "@/utils/functions";
import MapDescription from "@/components/MapDescription/MapDescription";
import { MapLegend } from "@/components/MapLegend/MapLegend";

const MapPageWrapper = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <MapPage />
  </Suspense>
);

const DEFAULT_TIFF = "spei";

const MapPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "",
  });

  const [descriptionInfo, setDescriptionInfo] =
    useState<IEEInfo>(defaultEEInfo);
  const [isDescRetracted, setIsDescRetracted] = useState<boolean>(true);
  const handleDescUpdate = useCallback(
    (name: string) => {
      if (name === descriptionInfo.id) {
        setIsDescRetracted(!isDescRetracted);
      } else {
        setIsDescRetracted(false);
      }
      setDescriptionInfo(EEImages[name]);
    },
    [setIsDescRetracted, setDescriptionInfo, isDescRetracted, descriptionInfo],
  );

  const [isMenuRetracted, setIsmenuRetracted] = useState<boolean>(false);

  const handleMapClick = useCallback(() => {
    setIsmenuRetracted(true);
    setIsDescRetracted(true);
  }, [setIsmenuRetracted, setIsDescRetracted]);

  const handleVisuChange = useCallback(
    (newImageData: IMapInfo) => {
      const { name, year } = newImageData;
      const params = new URLSearchParams(searchParams.toString());

      params.set("name", name);
      params.set("year", year || "general");

      router.push(`${pathname}?${params.toString()}`);

      setImageData(newImageData);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    let name = searchParams?.get("name") ?? "spei";
    let year = searchParams?.get("year") ?? "general";

    if (!(name in EEImages)) {
      name = DEFAULT_TIFF;
    }

    if (!(year in EEImages[name])) {
      year = Object.keys(EEImages[name].imageData)[0];
    }

    setImageData({ name, year });
    setDescriptionInfo(EEImages[name]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapTemplate>
      <MapContainer>
        <MapTiff data={imageData} onClick={handleMapClick} />
      </MapContainer>
      <MapDescription
        imageInfo={descriptionInfo}
        retracted={isDescRetracted}
        setRetracted={setIsDescRetracted}
      />
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu
            initialValues={imageData}
            options={Object.values(EEImages)}
            retracted={isMenuRetracted}
            setRetracted={setIsmenuRetracted}
            onSelectChange={handleVisuChange}
            onQuestionSelect={handleDescUpdate}
          />
          <Link href="/">
            <HomeImage src={HomeIcon} alt={HomeIcon} height={16} width={16} />
          </Link>
        </MenuWrapper>
        {imageData.name && (
          <NameContainer>
            <VisuName>{capitalize(EEImages[imageData.name]?.name)}</VisuName>
            <div onClick={() => handleDescUpdate(imageData.name)}>
              <QuestionImage
                title={`Sobre ${EEImages[imageData.name]?.name}`}
                src={QuestionIcon}
                alt={QuestionIcon}
                height={20}
                width={20}
              />
            </div>
          </NameContainer>
        )}
      </HeaderWrapper>
      <MapLegendContainer>
        {imageData.name && (
          <MapLegend
            imageInfo={EEImages[imageData.name]}
            year={imageData.year || "general"}
          />
        )}
      </MapLegendContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
