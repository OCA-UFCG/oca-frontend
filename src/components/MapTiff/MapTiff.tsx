"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Loading, LoadingText } from "./MapTiff.styles";
import { IEEInfo, IMapInfo } from "@/utils/interfaces";
import {
  MAP_TIFF_STYLE,
  MAP_TIFF_BRAZIL_STATES,
  MAP_TIFF_BRAZIL_CITIES,
} from "@/utils/constants";
import MapPopup from "../MapPopup/MapPopup";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

const MapTiff = ({
  mapsData,
  data,
  loading,
  setLoading,
  onClick,
  isReduced,
  ...props
}: {
  mapsData: { fields: IEEInfo }[];
  data: IMapInfo;
  loading: boolean;
  setLoading: (e: boolean) => void;
  onClick?: (e: any) => void;
  isReduced: boolean;
}) => {
  const { name, year } = data;
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupRef = useRef(
    new maplibregl.Popup({ closeButton: false, closeOnClick: false }),
  );

  const initializeMap = useCallback(() => {
    if (mapContainer.current) {
      const newMap = new maplibregl.Map({
        container: mapContainer.current!,
        style: MAP_TIFF_STYLE,
        center: isReduced ? [-54.69, -15.13] : [-51.55, -15],
        zoom: isReduced ? 3 : 3.6,
        minZoom: isReduced ? 3 : 3.6,
        maxZoom: 10,
      });

      newMap.on("load", () => {
        if (!isReduced) {
          newMap.addControl(new maplibregl.NavigationControl(), "bottom-left");
        }

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

      setMap(newMap);
    }
  }, [isReduced, mapContainer]);

  const loadSource = useCallback(
    async (name: string, year: string) => {
      if (!map?.getSource(name + year) && mapsData.length > 0) {
        const mapData = mapsData.find(
          (data) => data.fields.id === name,
        )?.fields;
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
            tileSize: isReduced ? 128 : 256,
          });
        }
      }
    },
    [map, mapsData, setLoading],
  );

  const cacheMapData = useCallback(async () => {
    mapsData.forEach(async (data) => {
      const id = data.fields.id;
      const imageData = data.fields.imageData;
      if (!isReduced) {
        Object.keys(imageData).forEach(async (year) => {
          if (map && !map?.getSource(data + year)) loadSource(id, year);
        });
      } else {
        const dates = Object.keys(imageData);
        loadSource(id, dates[dates.length - 1]);
      }
    });
  }, [mapsData, loadSource]);

  const loadMapLayer = useCallback(
    async (name: string, year: string) => {
      setLoading(true);
      await loadSource(name, year);

      const symbolLayer = map
        ?.getStyle()
        ?.layers?.find((layer) => layer.type === "symbol");

      if (map && symbolLayer) {
        map.addLayer(
          {
            type: "raster",
            source: `${name}${year}`,
            id: `@oca/${name}${year}`,
          },
          symbolLayer.id,
        );
      }

      cacheMapData();

      setLoading(false);
    },
    [map, setLoading, loadSource, cacheMapData],
  );

  const addPopupEffect = useCallback(
    async (name: string, year: string) => {
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
              <MapPopup
                nameUF={fcProperties.NM_UF}
                colors={rasterColors}
                nameRaster={rasterMetadata.fields.name}
                fcMetadata={fcMetadata}
              />,
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
    },
    [map, mapsData],
  );

  const cleanOcaLayers = (map: maplibregl.Map) => {
    const mapLayers: string[] = map
      ?.getLayersOrder()
      .filter((layer: string) => layer.startsWith("@oca/"));
    mapLayers.forEach((layer: string) => {
      if (map?.getLayer(layer)) {
        map?.removeLayer(layer);
      }
    });
  };

  useEffect(
    () => {
      if (map && name) {
        const yearStr = year || "general";
        if (!isReduced) addPopupEffect(name, yearStr);
        loadMapLayer(name, yearStr);

        return () => {
          cleanOcaLayers(map);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, year],
  );

  useEffect(
    () => {
      if (!map) {
        initializeMap();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, mapsData, isReduced, initializeMap],
  );

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
