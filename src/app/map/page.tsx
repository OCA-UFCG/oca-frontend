"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { IMapInfo } from "@/utils/interfaces";
import MapTiff from "@/components/MapTiff/MapTiff";
import MapTemplate from "@/templates/mapTemplate";
import MapsMenu from "@/components/MapsMenu/MapsMenu";
import { EEImages } from "@/utils/constants";
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

const MapPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const name = searchParams?.get("name");
  const year = searchParams?.get("year");
  const [description, setDescription] = useState<IEEInfo>(EEImages.degradacao);
  const [openDescriptionModal, setOpenDescriptionModal] =
    useState<boolean>(false);

  const [imageData, setImageData] = useState<IMapInfo>({
    name: name ?? "",
    year: year ?? "",
  });

  const createQueryString = useCallback(
    (newData: IMapInfo) => {
      console.log("dado novooo", newData);
      const params = new URLSearchParams(searchParams.toString());

      params.set("name", newData.name);
      params.set("year", newData.year || "general");

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const handleVisuChange = (newImageData: IMapInfo) => {
    setImageData(newImageData);
    createQueryString(newImageData);
  };

  const handleSetDescription = useCallback((name: string) => {
    setDescription(EEImages[name]);
    setOpenDescriptionModal(false);
  }, []);

  return (
    <MapTemplate>
      <MapDescription
        imageData={description}
        retracted={openDescriptionModal}
        setRetracted={setOpenDescriptionModal}
      />
      <MapContainer>
        <MapTiff data={imageData} />
      </MapContainer>
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu
            initialValues={imageData}
            options={Object.values(EEImages)}
            onSelectChange={handleVisuChange}
            onQuestionSelect={(name: string) => handleSetDescription(name)}
          />
          <Link href="/">
            <HomeImage src={HomeIcon} alt={HomeIcon} height={16} width={16} />
          </Link>
        </MenuWrapper>
        {imageData.name && (
          <NameContainer>
            <VisuName>
              {capitalize(EEImages[imageData.name]?.name || "undefined")}
            </VisuName>
            <div onClick={() => handleSetDescription(imageData.name)}>
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
        <MapLegend visuId={imageData.name} year={imageData.year || "general"} />
      </MapLegendContainer>
    </MapTemplate>
  );
};

export default MapPageWrapper;
