import { LinkButton, SectionTitle, SpinningIcon } from "@/app/globalStyles";
import {
  Description,
  LoadingContainer,
  MapPoster,
  Tag,
  TagsContainer,
  VisuName,
  Wrapper,
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

  const updateCurrentVisu = (visuId: string) => {
    if (visuId !== currentVisu.id) {
      setCurrentVisu(
        mapsData.find((map) => map.fields.id === visuId)?.fields ??
          defaultEEInfo,
      );
    }
  };

  useEffect(() => {
    if (mapsData.length != 0) {
      setCurrentVisu(mapsData.map((map) => map.fields)[0]);
    }

    setLoading(false);
  }, [mapsData]);

  return (
    <Wrapper id="maps-visu">
      <SectionTitle variation="white">Mapas e Visualizações</SectionTitle>
      <TagsContainer>
        {mapsData.map(({ fields: tag }: { fields: IEEInfo }) => (
          <Tag
            key={tag.id}
            active={(tag.id === currentVisu.id).toString()}
            onClick={() => updateCurrentVisu(tag.id)}
          >
            {capitalize(tag.name)}
          </Tag>
        ))}
      </TagsContainer>
      {loading ? (
        <LoadingContainer>
          <SpinningIcon
            src={LoadingImage}
            alt="Representação de uma flor que existe no nordete com cinco pétalas"
          />
          <span>Carregando..</span>
        </LoadingContainer>
      ) : (
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
      )}
      <VisuName>{capitalize(currentVisu.name)}</VisuName>
      <Description>{currentVisu.description}</Description>
      <LinkButton href={`/map?name=${currentVisu.id}`}>Visualizar</LinkButton>
    </Wrapper>
  );
};

export default MapsSection;
