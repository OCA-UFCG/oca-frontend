import { LinkButton, SectionTitle } from "@/app/globalStyles";
import {
  Description,
  MapPoster,
  Tag,
  TagsContainer,
  VisuName,
  Wrapper,
} from "./MapsSection.styles";
import { useState } from "react";
import { IEEInfo } from "@/utils/interfaces";
import { EEImages } from "@/utils/constants";
import { capitalize } from "@/utils/functions";

const MapsSection = () => {
  const [currentVisu, setCurrentVisu] = useState<IEEInfo>(
    EEImages["degradacao"],
  );

  const updateCurrentVisu = (visuId: string) => {
    if (visuId !== currentVisu.id) {
      setCurrentVisu(EEImages[visuId]);
    }
  };

  return (
    <Wrapper id="maps-visu">
      <SectionTitle variation="white">Mapas e Visualizações</SectionTitle>
      <TagsContainer>
        {(Object.values(EEImages) as IEEInfo[]).map((tag: IEEInfo) => (
          <Tag
            key={tag.id}
            active={(tag.id === currentVisu.id).toString()}
            onClick={() => updateCurrentVisu(tag.id)}
          >
            {capitalize(tag.name)}
          </Tag>
        ))}
      </TagsContainer>
      <MapPoster alt="" width={500} height={400} src={currentVisu.posterUrl} />
      <VisuName>{capitalize(currentVisu.name)}</VisuName>
      <Description>{currentVisu.description}</Description>
      <LinkButton href={`/map?visu=${currentVisu.id}`}>Visualizar</LinkButton>
    </Wrapper>
  );
};

export default MapsSection;
