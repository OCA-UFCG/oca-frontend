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
  const areas = colors
    .map((color, index) => {
      const area = fcMetadata[`Area_km2_${index + 1}`];
      const formattedArea =
        area > 1000
          ? `${(area / 1000).toFixed(1)} Mil Km²`
          : `${area.toFixed(0)} Km²`;

      return {
        color,
        area: formattedArea,
        percent: fcMetadata[`Percent_${index + 1}`].toFixed(0),
      };
    })
    .filter(({ percent }) => percent > 0);

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
