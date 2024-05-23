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
import { useEffect, useState } from "react";
import { IEEImage, IEEInfo } from "@/utils/interfaces";
import { capitalize } from "@/utils/functions";
import { defaultEEInfo } from "@/utils/constants";
import LoadingImage from "@/../public/loading.svg";

const MapsSection = ({ eeInfos = {} }: { eeInfos: IEEImage }) => {
  const [currentVisu, setCurrentVisu] = useState<IEEInfo>(defaultEEInfo);
  const [loading, setLoading] = useState<boolean>(true);

  const updateCurrentVisu = (visuId: string) => {
    if (visuId !== currentVisu.id) {
      setCurrentVisu(eeInfos[visuId]);
    }
  };

  useEffect(() => {
    const keys = Object.keys(eeInfos);
    if (keys.length != 0) {
      setCurrentVisu(eeInfos[keys[0]]);
    }
    setLoading(false);
  }, [eeInfos]);

  return (
    <Wrapper id="maps-visu">
      <SectionTitle variation="white">Mapas e Visualizações</SectionTitle>
      <TagsContainer>
        {(Object.values(eeInfos) as IEEInfo[]).map((tag: IEEInfo) => (
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
          src={"currentVisu.posterUrl"}
        />
      )}
      <VisuName>{capitalize(currentVisu.name)}</VisuName>
      <Description>{currentVisu.description}</Description>
      <LinkButton href={`/map?visu=${currentVisu.id}`}>Visualizar</LinkButton>
    </Wrapper>
  );
};

export default MapsSection;
