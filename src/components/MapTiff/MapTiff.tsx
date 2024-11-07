"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MapContainer, Loading, LoadingText } from "./MapTiff.styles";
import {
  MAP_TIFF_STYLE,
  MAP_TIFF_BRAZIL_STATES,
  MAP_TIFF_BRAZIL_CITIES,
} from "@/utils/constants";
import MapPopup from "../MapPopup/MapPopup";
import { MapTiffContext } from "@/contexts/MapContext";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

const MapTiff = ({ isReduced = false, ...props }: { isReduced?: boolean }) => {
  const {
    currentVisu,
    tiffs,
    loading,
    setLoading,
    setMenuRetracted,
    setDescRetracted,
  } = useContext(MapTiffContext);

  const { id, year } = currentVisu;
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
    async (id: string, year: string) => {
      if (!map?.getSource(id + year) && tiffs.length > 0) {
        const mapData = tiffs.find((data) => data.fields.id === id)?.fields;
        const body = JSON.stringify(mapData);

        // Fetch the raster layer from the ee API
        const response = await fetch(
          `${HOST_URL}/api/ee?name=${id}&year=${year}`,
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
        if (!map?.getSource(id + year)) {
          map?.addSource(id + year, {
            type: "raster",
            tiles: [url],
            tileSize: isReduced ? 64 : 128,
          });
        }
      }
    },
    [map, tiffs, setLoading, isReduced],
  );

  const loadMapLayer = useCallback(
    async (id: string, year: string) => {
      setLoading(true);
      await loadSource(id, year);

      const symbolLayer = map
        ?.getStyle()
        ?.layers?.find((layer) => layer.type === "symbol");

      if (map && symbolLayer) {
        map.addLayer(
          {
            type: "raster",
            source: `${id}${year}`,
            id: `@oca/${id}${year}`,
          },
          symbolLayer.id,
        );
      }

      setLoading(false);
    },
    [map, setLoading, loadSource],
  );

  const addPopupEffect = useCallback(
    async (id: string, year: string) => {
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
          if (!fcProperties[id + year]) popupRef.current.remove();
          else {
            const fcMetadata = JSON.parse(fcProperties[id + year]);
            const rasterMetadata = tiffs.filter(
              (data) => data.fields.id === id,
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
    [map, tiffs],
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

  useEffect(() => {
    if (map && id && year) {
      if (!isReduced) addPopupEffect(id, year);
      loadMapLayer(id, year);

      return () => {
        cleanOcaLayers(map);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, year, map]);

  useEffect(() => {
    if (!map) {
      initializeMap();
    }
  }, [map, tiffs, isReduced, initializeMap]);

  const retrieveModals = useCallback(() => {
    setMenuRetracted(true);
    setDescRetracted(true);
  }, [setMenuRetracted, setDescRetracted]);

  return (
    <MapContainer
      {...props}
      loading={loading.toString()}
      onClick={retrieveModals}
      ref={mapContainer}
    >
      <LoadingText>Carregando mapa</LoadingText>
      <Loading id="loading" size={40} />
    </MapContainer>
  );
};

export default MapTiff;
