"use client";

import {
  Description,
  ExpandBox,
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
} from "./MapsSection.styles";
import { useEffect, useState } from "react";
import { IEEInfo, ISectionHeader } from "@/utils/interfaces";
import { defaultEEInfo } from "@/utils/constants";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { MapSection } from "../MapTiff/Section/MapSectionReduced";

const MapsSection = ({
  sectionHead,
  tiffInfo,
}: {
  sectionHead: ISectionHeader[];
  tiffInfo: { fields: IEEInfo }[];
}) => {
  const [currentVisu, setCurrentVisu] = useState<IEEInfo>(defaultEEInfo);
  let handler: NodeJS.Timeout;

  const updateCurrentVisu = (
    visuId: string,
    event?: { preventDefault: () => void } | undefined,
  ) => {
    event?.preventDefault();
    if (visuId !== currentVisu.id) {
      setCurrentVisu(
        tiffInfo.find((map) => map.fields.id === visuId)?.fields ??
          defaultEEInfo,
      );
    }
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
    }, 7000);
  };

  useEffect(() => {
    if (tiffInfo.length > 1) {
      visuDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVisu, tiffInfo]);

  useEffect(() => {
    if (tiffInfo.length != 0) {
      setCurrentVisu(tiffInfo.map((map) => map.fields)[0]);
    }
  }, [tiffInfo]);

  return (
    <MapSectionWrapper id="maps-visu">
      <SectionHeader id="maps-visu" sectionHead={sectionHead} />
      <BoxWrapper>
        <PreviewWrapper>
          <ExpandBox href={`/map?name=${currentVisu.id}`}>
            <Icon id="expand" size={18} />
          </ExpandBox>
          {/*
          <MapPoster
            alt=""
            width={500}
            height={400}
            src={
              typeof currentVisu.poster === "object"
                ? `https:${currentVisu.poster.fields.file.url}`
                : currentVisu.poster
            }
            />
          */}
          <MapSection mapsData={tiffInfo} />
        </PreviewWrapper>
        {tiffInfo.length != 0 && (
          <TagsContainer>
            {tiffInfo.map(({ fields: tag }: { fields: IEEInfo }) => (
              <TagButton
                key={tag.id}
                active={(tag.id === currentVisu.id).toString()}
                onClick={(e) => updateCurrentVisu(tag.id, e)}
              >
                <VisuHeader>
                  <VisuName active={(tag.id === currentVisu.id).toString()}>
                    {tag.name}
                  </VisuName>
                  <IconWrapper>
                    <VisuIcon
                      active={(tag.id === currentVisu.id).toString()}
                      id={tag.id === currentVisu.id ? "open-eye" : "closed-eye"}
                      size={20}
                    />
                    <Divider />
                    <LinkButton
                      href={`/map?name=${tag.id}`}
                      active={(tag.id === currentVisu.id).toString()}
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
