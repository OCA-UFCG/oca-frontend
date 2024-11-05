import { IImageParam } from "@/utils/interfaces";
import {
  DataLegendContainer,
  DataContainer,
  Title,
  Wrapper,
  ColorLabel,
  Color,
  Measurement,
  HeaderContainer,
  SubtractImage,
  MetaInfo,
  MetaInfoContainer,
  ContentContainer,
} from "./MapLegend.styles";
import { useContext, useMemo } from "react";
import { MapTiffContext } from "@/contexts/MapContext";

export const MapLegend = () => {
  const { tiffs, currentVisu } = useContext(MapTiffContext);

  const imageInfo = useMemo(
    () => tiffs.find((tiff) => tiff.fields.id === currentVisu.id)?.fields,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVisu.id],
  );

  return (
    <Wrapper open={true}>
      <HeaderContainer>
        <Title>{imageInfo?.graphLegendTitle || imageInfo?.name}</Title>
        <SubtractImage id="subtract" height={16} width={16} />
      </HeaderContainer>
      <ContentContainer>
        <DataLegendContainer>
          {imageInfo?.imageData[
            currentVisu?.year || "general"
          ]?.imageParams.map(({ color, label }: IImageParam) => {
            return (
              <DataContainer
                key={color}
                title={`${label} ${imageInfo?.measurementUnit !== "classes" ? imageInfo?.measurementUnit : ""}`}
              >
                <Color color={color} />
                <ColorLabel>{label}</ColorLabel>

                <Measurement>
                  {imageInfo?.measurementUnit !== "classes"
                    ? imageInfo?.measurementUnit
                    : ""}
                </Measurement>
              </DataContainer>
            );
          })}
        </DataLegendContainer>
        {imageInfo?.extraInfo && (
          <MetaInfoContainer>
            {imageInfo?.extraInfo.map((info: string) => (
              <MetaInfo key={info}>{info}</MetaInfo>
            ))}
          </MetaInfoContainer>
        )}
      </ContentContainer>
    </Wrapper>
  );
};
