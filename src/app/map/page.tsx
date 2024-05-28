"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const visu = searchParams?.get("visu");

  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "",
  });

  useEffect(() => {
    if (visu) {
      const name = visu;
      const year = "";
      setImageData({ name, year });
    }
  }, [visu]);

  return (
    <MapTemplate>
      <MapContainer>
        <MapTiff data={imageData} />
      </MapContainer>
      <HeaderWrapper>
        <MenuWrapper>
          <MapsMenu
            initialValue="spei"
            options={Object.values(EEImages)}
            onSelectChange={() => console.log("oiii")}
            onQuestionSelect={() => console.log("TCHAUUU")}
          />
          <Link href="/">
            <HomeImage src={HomeIcon} alt={HomeIcon} height={16} width={16} />
          </Link>
        </MenuWrapper>
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
      </HeaderWrapper>
    </MapTemplate>
  );
};

export default MapPage;
