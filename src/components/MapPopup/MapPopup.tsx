import React from "react";
import {
  PopupContent,
  TopHeader,
  Title,
  Subtitle,
  LineInfo,
  TotalArea,
  PercentArea,
  Color,
} from "./MapPopup.styles"; // Estilos importados

interface AreaInfo {
  color: string;
  area: string;
  percent: number;
}

interface MapPopupProps {
  nameUF: string;
  colors: string[];
  nameRaster: string;
  fcMetadata: any;
}

const MapPopup: React.FC<MapPopupProps> = ({
  nameUF,
  colors,
  nameRaster,
  fcMetadata,
}) => {
  const areas = Array.from({ length: 6 }, (_, index) => ({
    area: fcMetadata[`Area_km2_${index + 1}`],
    color: colors[index],
    percent: fcMetadata[`Percent_${index + 1}`],
  }))
    .filter(({ percent }) => percent > 0)
    .map((areaInfo) => {
      const formattedArea =
        areaInfo.area > 1000
          ? `${(areaInfo.area / 1000).toFixed(1)} Mil Km²`
          : `${areaInfo.area.toFixed(0)} Km²`;

      return {
        color: areaInfo.color,
        area: formattedArea,
        percent: areaInfo.percent.toFixed(0),
      };
    });

  return (
    <PopupContent>
      <TopHeader>
        <Title>{nameUF}</Title>
        <Subtitle>{nameRaster}</Subtitle>
      </TopHeader>
      {areas.map((areaInfo: AreaInfo, index) => (
        <LineInfo key={index}>
          <TotalArea>{areaInfo.area}</TotalArea>
          <Color color={areaInfo.color} $percent={areaInfo.percent} />
          <PercentArea>{areaInfo.percent}%</PercentArea>
        </LineInfo>
      ))}
    </PopupContent>
  );
};

export default MapPopup;
