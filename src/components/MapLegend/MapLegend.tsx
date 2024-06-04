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
import { EEImages } from "@/utils/constants";
import SubtractIcon from "@/../public/subtract-icon.svg";
import { useState } from "react";
import { capitalize } from "@/utils/functions";

interface MapLegendProps {
  visuId: string;
  year: string;
}

export const MapLegend = ({ visuId, year = "general" }: MapLegendProps) => {
  const [retracted, setRetracted] = useState<string>("open");

  const { name, imageData, measurementUnit, extraInfo } = EEImages[visuId];

  return (
    <Wrapper>
      <HeaderContainer
        onClick={() =>
          setRetracted((previous) =>
            previous === "retracted" ? "open" : "retracted",
          )
        }
      >
        <Title>{name}</Title>
        <SubtractImage
          retracted={retracted}
          src={SubtractIcon}
          alt={SubtractIcon}
          height={16}
          width={16}
        />
      </HeaderContainer>
      <ContentContainer retracted={retracted}>
        <DataLegendContainer>
          {imageData[year].imageParams.map(({ color, label }: IImageParam) => {
            return (
              <DataContainer
                key={color}
                title={`${label} ${measurementUnit !== "classes" && measurementUnit}`}
              >
                <Color color={color} />
                <ColorLabel>{capitalize(label)}</ColorLabel>

                <Measurement>
                  {measurementUnit !== "classes" ? measurementUnit : ""}
                </Measurement>
              </DataContainer>
            );
          })}
        </DataLegendContainer>
        {extraInfo && (
          <MetaInfoContainer>
            {extraInfo.map((info: string) => (
              <MetaInfo key={info}>{info}</MetaInfo>
            ))}
          </MetaInfoContainer>
        )}
      </ContentContainer>
    </Wrapper>
  );
};
