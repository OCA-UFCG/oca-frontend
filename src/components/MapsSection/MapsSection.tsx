"use client";

import {
  ExpandBox,
  PinBox,
  TagsContainer,
  MapSectionWrapper,
  BoxWrapper,
  PreviewWrapper,
  ButtonsWrapper,
} from "./MapsSection.styles";

import { useContext, useEffect, useState } from "react";
import { IEEInfo, ISectionHeader } from "@/utils/interfaces";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import TagButtonMaps from "../TagButtonMaps/TagButtonMaps";
import { MapTiffContext } from "@/contexts/MapContext";
import MapTiff from "../MapTiff/MapTiff";

const MapsSection = ({ sectionHead }: { sectionHead: ISectionHeader[] }) => {
  const { tiffs, currentVisu, setCurrentVisu } = useContext(MapTiffContext);
  const [pinMap, setPinMap] = useState<boolean>(false);

  const updateCurrentVisu = (
    visuId: string,
    event?: { preventDefault: () => void } | undefined,
  ) => {
    event?.preventDefault();
    setPinMap(false);

    if (visuId !== currentVisu.id) {
      setCurrentVisu({ id: visuId, year: "" });
    }
  };

  const nextVisu = () => {
    const currentIndex = tiffs.findIndex(
      (map) => map.fields.id === currentVisu.id,
    );
    const nextIndex = (currentIndex + 1) % tiffs.length;
    updateCurrentVisu(tiffs[nextIndex].fields.id);
  };

  let handler: NodeJS.Timeout;
  const visuDebounce = () => {
    handler = setTimeout(() => {
      nextVisu();
    }, 10000);
  };

  useEffect(() => {
    if (tiffs.length > 1 && !pinMap) {
      visuDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVisu, tiffs, pinMap]);

  return (
    <MapSectionWrapper id="maps-visu">
      <SectionHeader id="maps-visu" sectionHead={sectionHead} />
      <BoxWrapper>
        <PreviewWrapper>
          <ButtonsWrapper>
            <ExpandBox
              href={`/map?id=${currentVisu.id}`}
              title={`Expandir mapa`}
            >
              <Icon id="expand" size={18} />
            </ExpandBox>
            <PinBox
              onClick={() => setPinMap(!pinMap)}
              title={`${pinMap ? "Desafixar" : "Fixar"} mapa`}
            >
              <Icon id={pinMap ? "unpin" : "pin"} size={18} />
            </PinBox>
          </ButtonsWrapper>
          <MapTiff isReduced={true} />
        </PreviewWrapper>
        {tiffs.length != 0 && (
          <TagsContainer>
            {tiffs
              .sort((a, b) => a.fields.name.localeCompare(b.fields.name))
              .map(({ fields: tag }: { fields: IEEInfo }) => (
                <TagButtonMaps key={tag.id} tag={tag} />
              ))}
          </TagsContainer>
        )}
      </BoxWrapper>
    </MapSectionWrapper>
  );
};

export default MapsSection;
