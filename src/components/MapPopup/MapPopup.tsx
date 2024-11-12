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
  InfoContent,
  List,
} from "./MapPopup.styles";

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
        <Subtitle>{fcMetadata.Area_general}</Subtitle>
      </TopHeader>
      <InfoContent>
        <List>
          {areas.map((areaInfo: AreaInfo, index) => (
            <LineInfo key={index} isColored={colors.length > 0}>
              {colors.length > 0 && (
                <Color
                  color={areaInfo.color}
                  $percent={areaInfo.percent || 45}
                />
              )}
              <TotalArea>{areaInfo.area}</TotalArea>
              {areaInfo.percent && (
                <PercentArea>{areaInfo.percent}%</PercentArea>
              )}
            </LineInfo>
          ))}
        </List>
      </InfoContent>
    </PopupContent>
  );
};

export default MapPopup;
