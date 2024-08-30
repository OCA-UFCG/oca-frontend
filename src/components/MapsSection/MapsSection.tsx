"use client";

import { SectionTitle, SpinningIcon } from "@/app/globalStyles";
import {
  Description,
  LoadingContainer,
  MapPoster,
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
import { useContext, useEffect, useState } from "react";
import { IEEInfo } from "@/utils/interfaces";
import { capitalize } from "@/utils/functions";
import { defaultEEInfo } from "@/utils/constants";
import LoadingImage from "@/../public/loading.svg";
import { CMSContext } from "@/contexts/ContentProvider";

const MapsSection = () => {
  const [currentVisu, setCurrentVisu] = useState<IEEInfo>(defaultEEInfo);
  const [loading, setLoading] = useState<boolean>(true);
  const { mapsData } = useContext(CMSContext);
  let handler: NodeJS.Timeout;

  const updateCurrentVisu = (
    visuId: string,
    event?: { preventDefault: () => void } | undefined,
  ) => {
    event?.preventDefault();
    if (visuId !== currentVisu.id) {
      setCurrentVisu(
        mapsData.find((map) => map.fields.id === visuId)?.fields ??
          defaultEEInfo,
      );
    }
  };

  const nextVisu = () => {
    const currentIndex = mapsData.findIndex(
      (map) => map.fields.id === currentVisu.id,
    );
    const nextIndex = (currentIndex + 1) % mapsData.length;
    updateCurrentVisu(mapsData[nextIndex].fields.id);
  };

  const visuDebounce = () => {
    handler = setTimeout(() => {
      nextVisu();
    }, 7000);
  };

  useEffect(() => {
    if (mapsData.length > 1) {
      visuDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
  }, [currentVisu, mapsData]);

  useEffect(() => {
    if (mapsData.length != 0) {
      setCurrentVisu(mapsData.map((map) => map.fields)[0]);
    }

    setLoading(false);
  }, [mapsData]);

  return (
    <MapSectionWrapper id="maps-visu">
      <SectionTitle variation="black">Mapas e Visualizações</SectionTitle>
      <BoxWrapper>
        {loading ? (
          <LoadingContainer>
            <SpinningIcon
              src={LoadingImage}
              alt="Representação de uma flor que existe no nordete com cinco pétalas"
            />
            <span>Carregando..</span>
          </LoadingContainer>
        ) : (
          <PreviewWrapper>
            <ExpandBox href={`/map?name=${currentVisu.id}`}>
              <VisuIcon id="expand" size={20} />
            </ExpandBox>
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
          </PreviewWrapper>
        )}
        {mapsData.length != 0 && (
          <TagsContainer>
            {mapsData.map(({ fields: tag }: { fields: IEEInfo }) => (
              <TagButton
                key={tag.id}
                active={(tag.id === currentVisu.id).toString()}
                onClick={(e) => updateCurrentVisu(tag.id, e)}
              >
                <VisuHeader>
                  <VisuName active={(tag.id === currentVisu.id).toString()}>
                    {capitalize(tag.name)}
                  </VisuName>
                  <IconWrapper>
                    <VisuIcon
                      active={(tag.id === currentVisu.id).toString()}
                      id={tag.id === currentVisu.id ? "open-eye" : "closed-eye"}
                      size={20}
                    />
                    <Divider />
                    <LinkButton
                      href={`/map?name=${currentVisu.id}`}
                      active={(tag.id === currentVisu.id).toString()}
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
