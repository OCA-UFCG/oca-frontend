"use client";

import {
  Description,
  ExpandBox,
  PinBox,
  TagButton,
  TagsContainer,
  VisuHeader,
  VisuIcon,
  IconWrapper,
  Divider,
  LinkButton,
  VisuName,
  MapSectionWrapper,
  BoxWrapper,
  PreviewWrapper,
  ButtonsWrapper,
} from "./MapsSection.styles";

import { LoadingIcon } from "../VisuItem/VisuItem.styles";
import { useEffect, useState } from "react";
import { IEEInfo, ISectionHeader } from "@/utils/interfaces";
import { defaultEEInfo } from "@/utils/constants";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import MapPageWrapper from "../MapTiff/Section/MapSectionReduced";
import { IMapInfo } from "@/utils/interfaces";

const MapsSection = ({
  sectionHead,
  tiffInfo,
}: {
  sectionHead: ISectionHeader[];
  tiffInfo: { fields: IEEInfo }[];
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentVisu, setCurrentVisu] = useState<IEEInfo>(defaultEEInfo);
  const [imageData, setImageData] = useState<IMapInfo>({
    name: "",
    year: "general",
  });
  const [pinMap, setPinMap] = useState<boolean>(false);

  let handler: NodeJS.Timeout;

  const updateCurrentVisu = (
    visuId: string,
    event?: { preventDefault: () => void } | undefined,
  ) => {
    event?.preventDefault();
    setPinMap(false);
    if (visuId !== currentVisu.id) {
      setCurrentVisu(
        tiffInfo.find((map) => map.fields.id === visuId)?.fields ||
          defaultEEInfo,
      );
    }
  };

  const handlePin = () => {
    setPinMap(!pinMap);
  };

  const nextVisu = () => {
    const currentIndex = tiffInfo.findIndex(
      (map) => map.fields.id === currentVisu.id,
    );
    const nextIndex = (currentIndex + 1) % tiffInfo.length;
    updateCurrentVisu(tiffInfo[nextIndex].fields.id);
  };

  const visuDebounce = () => {
    handler = setTimeout(() => {
      nextVisu();
    }, 10000);
  };

  useEffect(() => {
    if (tiffInfo.length > 1 && !pinMap) {
      visuDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVisu, tiffInfo, pinMap]);

  useEffect(() => {
    if (tiffInfo.length !== 0) {
      setCurrentVisu(tiffInfo.map((map) => map.fields)[0]);
    }
  }, [tiffInfo]);

  useEffect(() => {
    if (currentVisu.id) {
      setImageData({
        name: currentVisu.id,
        year: Object.keys(currentVisu.imageData)[
          Object.keys(currentVisu.imageData).length - 1
        ],
      });
    }
  }, [currentVisu]);

  return (
    <MapSectionWrapper id="maps-visu">
      <SectionHeader id="maps-visu" sectionHead={sectionHead} />
      <BoxWrapper>
        <PreviewWrapper>
          <ButtonsWrapper>
            <ExpandBox
              href={`/map?name=${currentVisu.id}`}
              title={`Expandir mapa: ${currentVisu.name}`}
            >
              <Icon id="expand" size={18} />
            </ExpandBox>
            <PinBox
              onClick={handlePin}
              title={`${pinMap ? "Desafixar" : "Fixar"} mapa: ${currentVisu.name}`}
            >
              <Icon id={pinMap ? "unpin" : "pin"} size={18} />
            </PinBox>
          </ButtonsWrapper>
          <MapPageWrapper
            mapsData={tiffInfo}
            ImgData={imageData}
            isReduced={true}
            isLoading={isLoading}
            setLoading={setLoading}
          />
        </PreviewWrapper>
        {tiffInfo.length != 0 && (
          <TagsContainer>
            {tiffInfo
              .sort((a: { fields: IEEInfo }, b: { fields: IEEInfo }) =>
                a.fields.name.localeCompare(b.fields.name),
              )
              .map(({ fields: tag }: { fields: IEEInfo }) => (
                <TagButton
                  key={tag.id}
                  active={(tag.id === currentVisu.id).toString()}
                  onClick={(e) => {
                    if (!isLoading) updateCurrentVisu(tag.id, e);
                  }}
                  isLoading={isLoading}
                >
                  <VisuHeader>
                    <VisuName active={(tag.id === currentVisu.id).toString()}>
                      {tag.name}
                    </VisuName>
                    <IconWrapper>
                      {isLoading ? (
                        <LoadingIcon id={"loading"} size={18} />
                      ) : (
                        <VisuIcon
                          active={(tag.id === currentVisu.id).toString()}
                          id={
                            tag.id === currentVisu.id
                              ? "open-eye"
                              : "closed-eye"
                          }
                          size={20}
                        />
                      )}
                      <Divider />
                      <LinkButton
                        active={(tag.id === currentVisu.id).toString()}
                        href={`/map?name=${tag.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Visualizar
                      </LinkButton>
                    </IconWrapper>
                  </VisuHeader>
                  <Description active={(tag.id === currentVisu.id).toString()}>
                    {currentVisu.description}
                  </Description>
                </TagButton>
              ))}
          </TagsContainer>
        )}
      </BoxWrapper>
    </MapSectionWrapper>
  );
};

export default MapsSection;
