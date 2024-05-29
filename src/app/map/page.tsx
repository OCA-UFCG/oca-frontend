"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
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
  MenuWrapper,
  NameContainer,
  QuestionImage,
  VisuName,
} from "./styles";
import Link from "next/link";
import { capitalize } from "@/utils/functions";

const MapPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const name = searchParams?.get("name");
  const year = searchParams?.get("year");

  const [imageData, setImageData] = useState<IMapInfo>({
    name: name ?? "",
    year: year ?? "",
  });

  const createQueryString = useCallback(
    (newData: IMapInfo) => {
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

  return (
    <MapTemplate>
      <MapContainer>
        <MapTiff data={imageData} />
      </MapContainer>
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu
            initialValues={imageData}
            options={Object.values(EEImages)}
            onSelectChange={handleVisuChange}
            onQuestionSelect={() => console.log("TCHAUUU")}
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
            <QuestionImage
              src={QuestionIcon}
              alt={QuestionIcon}
              height={20}
              width={20}
            />
          </NameContainer>
        )}
      </HeaderWrapper>
    </MapTemplate>
  );
};

export default MapPage;
