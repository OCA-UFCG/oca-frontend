import { IEEInfo, IImageParam } from "@/utils/interfaces";
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
import { useState } from "react";
import { capitalize } from "@/utils/functions";

interface MapLegendProps {
  imageInfo: IEEInfo;
  year: string;
}

export const MapLegend = ({ imageInfo, year = "general" }: MapLegendProps) => {
  const [retracted, setRetracted] = useState<string>("open");

  const { name, imageData, measurementUnit, extraInfo } = imageInfo;

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
          id="subtract"
          height={16}
          width={16}
        />
      </HeaderContainer>
      <ContentContainer retracted={retracted}>
        <DataLegendContainer>
          {imageData[year]?.imageParams.map(({ color, label }: IImageParam) => {
            return (
              <DataContainer
                key={color}
                title={`${label} ${measurementUnit !== "classes" ? measurementUnit : ""}`}
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
