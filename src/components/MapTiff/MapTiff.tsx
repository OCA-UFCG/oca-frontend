"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import { useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Loading,
  LoadingText,
  PopupContent,
  TopHeader,
  Title,
  Subtitle,
  LineInfo,
  TotalArea,
  PercentArea,
  Color,
} from "./MapTiff.styles";
import { IMapInfo } from "@/utils/interfaces";
import {
  MAP_TIFF_STYLE,
  MAP_TIFF_BRAZIL_STATES,
  MAP_TIFF_BRAZIL_CITIES,
} from "@/utils/constants";
import { CMSContext } from "@/contexts/ContentProvider";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

const initializeMap = (mapContainer: React.RefObject<HTMLDivElement>) => {
  const newMap = new maplibregl.Map({
    container: mapContainer.current!,
    style: MAP_TIFF_STYLE,
    center: [-55, -15],
    zoom: 3.6,
    maxZoom: 10,
    minZoom: 3.6,
  });

  newMap.on("load", () => {
    newMap.addControl(new maplibregl.NavigationControl(), "bottom-left");

    newMap.addSource("brazil-states", {
      type: "geojson",
      data: MAP_TIFF_BRAZIL_STATES,
    });

    newMap.addLayer({
      id: "state-fills",
      type: "fill",
      source: "brazil-states",
      layout: {},
      paint: {
        "fill-color": "black",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.3,
          0,
        ],
      },
    });

    newMap.addLayer({
      id: "state-borders",
      type: "line",
      source: "brazil-states",
      layout: {},
      paint: {
        "line-color": "#2D2D2D",
        "line-width": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          2.5,
          1.5,
        ],
      },
    });

    newMap.addSource("brazil-cities", {
      type: "geojson",
      data: MAP_TIFF_BRAZIL_CITIES,
    });

    newMap.addLayer({
      id: "brazil-cities",
      type: "line",
      source: "brazil-cities",
      layout: {},
      paint: {
        "line-color": "#00000050",
        "line-width": 2,
      },
      minzoom: 6,
    });
  });

  return newMap;
};

const loadMapLayer = async (
  map: maplibregl.Map | null,
  mapsData: any[],
  name: string,
  year: string,
  setLoading: (loading: boolean) => void,
) => {
  setLoading(true);
  if (!map?.getSource(name + year) && mapsData.length > 0) {
    // Filter the contentful map data by name
    const mapData = mapsData.find((data) => data.fields.id === name)?.fields;
    const body = JSON.stringify(mapData);

    // Fetch the raster layer from the ee API
    const response = await fetch(
      `${HOST_URL}/api/ee?name=${name}&year=${year}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      },
    );

    if (response.status !== 200) {
      setLoading(false);

      return;
    }

    const { url } = await response.json();
    if (!map?.getSource(name + year)) {
      map?.addSource(name + year, {
        type: "raster",
        tiles: [url],
        tileSize: 256,
      });
    }
  }

  // This code adds a raster layer on top of the first "symbol" layer in the map's style.
  // It checks if the map and its layers exist, finds the first layer of type "symbol",
  // and inserts the raster layer right above it.
  const symbolLayer = map
    ?.getStyle()
    ?.layers?.find((layer) => layer.type === "symbol");

  if (map && symbolLayer) {
    map.addLayer(
      {
        type: "raster",
        source: `${name}${year}`,
        id: `${name}${year}`,
      },
      symbolLayer.id,
    );
  }
  setLoading(false);
};

const addPopupEffect = (
  map: maplibregl.Map | null,
  mapsData: any[],
  name: string,
  year: string,
  popupRef: React.MutableRefObject<maplibregl.Popup>,
) => {
  let hoveredStateId: string | number | undefined = undefined;
  const popupContainer = document.createElement("div");
  const root = createRoot(popupContainer);

  map?.on("mousemove", "state-fills", (e) => {
    if (e.features && e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: "brazil-states", id: hoveredStateId },
          { hover: false },
        );
      }

      hoveredStateId = e.features[0].id;
      map.setFeatureState(
        { source: "brazil-states", id: hoveredStateId },
        { hover: true },
      );

      const fcProperties = e.features[0].properties;
      if (!fcProperties[name + year]) popupRef.current.remove();
      else {
        const fcMetadata = JSON.parse(fcProperties[name + year]);
        const rasterMetadata = mapsData.filter(
          (data) => data.fields.id === name,
        )[0];
        const rasterColors = rasterMetadata.fields.imageData[
          year
        ]?.imageParams.map((param: any) => param.color);

        root.render(
          createPopupContent(
            fcProperties.NM_UF,
            rasterColors,
            rasterMetadata.fields.name,
            fcMetadata,
          ),
        );

        popupRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupContainer)
          .addTo(map);
      }
    }
  });

  map?.on("mouseleave", "state-fills", () => {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: "brazil-states", id: hoveredStateId },
        { hover: false },
      );
    }
    hoveredStateId = undefined;
    popupRef.current.remove();
  });
};

const createPopupContent = (
  nameUF: string,
  colors: string[],
  nameRaster: string,
  fcMetadata: any,
) => {
  const areas = colors.map((color, index) => {
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
  });

  return (
    <PopupContent>
      <TopHeader>
        <Title>{nameUF}</Title>
        <Subtitle>{nameRaster}</Subtitle>
      </TopHeader>
      {areas.map((areaInfo, index) => (
        <LineInfo key={index}>
          <TotalArea>{areaInfo.area}</TotalArea>
          <Color color={areaInfo.color} percent={areaInfo.percent} />
          <PercentArea>{areaInfo.percent}%</PercentArea>
        </LineInfo>
      ))}
    </PopupContent>
  );
};

const MapTiff = ({
  data,
  loading,
  setLoading,
  onClick,
  ...props
}: {
  data: IMapInfo;
  loading: boolean;
  setLoading: (e: boolean) => void;
  onClick?: (e: any) => void;
}) => {
  const { name, year } = data;
  const { mapsData } = useContext(CMSContext);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupRef = useRef(
    new maplibregl.Popup({ closeButton: false, closeOnClick: false }),
  );

  useEffect(() => {
    if (name && !map) {
      const initializedMap = initializeMap(mapContainer);
      setMap(initializedMap);
    }
    if (name) {
      const yearStr = year || "general";
      loadMapLayer(map, mapsData, name, yearStr, setLoading);
      addPopupEffect(map, mapsData, name, yearStr, popupRef);

      return () => {
        if (map?.getLayer(name + yearStr)) {
          map?.removeLayer(name + yearStr);
        }
      };
    }
  }, [name, year, map, mapsData, setLoading]);

  return (
    <MapContainer
      loading={loading.toString()}
      {...props}
      onClick={onClick}
      ref={mapContainer}
    >
      <LoadingText>Carregando mapa</LoadingText>
      <Loading id="loading" size={40} />
    </MapContainer>
  );
};

export default MapTiff;
