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
    color: colors[index],
    area: fcMetadata[`Area_info_${index + 1}`],
    percent: fcMetadata[`Percent_${index + 1}`]?.toFixed(2),
  })).filter((areaInfo) => areaInfo.area);

  return (
    <PopupContent>
      <TopHeader>
        <Title>{nameUF}</Title>
        <Subtitle>{nameRaster}</Subtitle>
      </TopHeader>
      {areas.map((areaInfo: AreaInfo, index) => (
        <LineInfo key={index}>
          <Color color={areaInfo.color} $percent={areaInfo.percent} />
          <TotalArea>({areaInfo.area})</TotalArea>
          <PercentArea>{areaInfo.percent}%</PercentArea>
        </LineInfo>
      ))}
    </PopupContent>
  );
};

export default MapPopup;
