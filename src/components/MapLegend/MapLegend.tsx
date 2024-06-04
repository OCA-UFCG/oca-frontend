import { IImageParam } from "@/utils/interfaces";
import {
  DataLegendContainer,
  DataContainer,
  Title,
  Wrapper,
  ColorLabel,
  Color,
} from "./MapLegend.styles";
import { EEImages } from "@/utils/constants";

interface MapLegendProps {
  title: string;
  legendData: IImageParam[];
  measurementUnit: string;
}

export const MapLegend = ({
  title = "Carbono Orgânico do Solo",
  legendData = EEImages.carbono.imageData.general.imageParams,
  measurementUnit = EEImages.carbono.measurementUnit,
}: MapLegendProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <DataLegendContainer>
        <p>{measurementUnit}</p>
        {legendData.map((data: IImageParam) => {
          return (
            <DataContainer key={data.color}>
              <Color color={data.color} />
              <ColorLabel>{data.label}</ColorLabel>
            </DataContainer>
          );
        })}
      </DataLegendContainer>
    </Wrapper>
  );
};
