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
import { fetchMapSources } from "@/services/mapServices";

const MapTiff = ({ isReduced = false, ...props }: { isReduced?: boolean }) => {
  const {
    currentVisu,
    tiffs,
    loading,
    setLoading,
    setMenuRetracted,
    setDescRetracted,
  } = useContext(MapTiffContext);

  const [loadedSources, setLoadedSources] = useState(new Set<string>());
  const { id, year } = currentVisu;
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const popupRef = useRef(
    new maplibregl.Popup({ closeButton: false, closeOnClick: false }),
  );

  const showOcaLayer = (map: maplibregl.Map, sourceKey: string) => {
    const symbolLayer = map
      .getStyle()
      ?.layers?.find((layer) => layer.type === "symbol");

    if (map.getSource(sourceKey) && symbolLayer) {
      map.addLayer(
        {
          type: "raster",
          source: sourceKey,
          id: sourceKey,
        },
        symbolLayer?.id,
      );
    }
  };

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

  const loadSources = useCallback(
    async (map: maplibregl.Map) => {
      // === Add current raster source
      const yearStr = year ? year : "general";
      const mapData = tiffs.find((data) => data.fields.id === id)?.fields;
      fetchMapSources(id, yearStr, JSON.stringify(mapData))
        .then(({ url }) => {
          map.addSource(`@oca/${id}${yearStr}`, {
            type: "raster",
            tiles: [url],
            tileSize: isReduced ? 64 : 128,
          });
        })
        .then(() => {
          for (const additionalMapData of tiffs) {
            for (const y of Object.keys(additionalMapData.fields.imageData)) {
              const cId = additionalMapData.fields.id;
              const sourceKey = `@oca/${cId}${y}`;

              if (map.getSource(sourceKey)) continue;
              if (cId === id && y === yearStr) continue;

              fetchMapSources(cId, y, JSON.stringify(additionalMapData.fields))
                .then(({ url: additionalUrl }) => {
                  map.addSource(sourceKey, {
                    type: "raster",
                    tiles: [additionalUrl],
                    tileSize: isReduced ? 64 : 128,
                  });
                })
                .catch((error) => {
                  console.error("Erro ao carregar fontes de mapa.", error);
                });
            }
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar fontes de mapa.", error);
        });

      // === Add Brazil states source
      map.addSource("brazil-states", {
        type: "geojson",
        data: MAP_TIFF_BRAZIL_STATES,
      });

      map.addLayer({
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

      map.addLayer({
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

      // === Add Brazil cities source
      map.addSource("brazil-cities", {
        type: "geojson",
        data: MAP_TIFF_BRAZIL_CITIES,
      });

      map.addLayer({
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
    },
    [id, year, tiffs, isReduced],
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

      newMap.on("load", async () => {
        if (!isReduced)
          newMap.addControl(new maplibregl.NavigationControl(), "bottom-left");

        loadSources(newMap);
      });

      newMap.on("sourcedata", (e) => {
        if (e.sourceId && e.isSourceLoaded && !loadedSources.has(e.sourceId)) {
          setLoadedSources((prev) => {
            const newSet = new Set(prev.add(e.sourceId));
            newSet.add(e.sourceId);

            return newSet;
          });
        }
      });

      setMap(newMap);
    }
  }, [isReduced, mapContainer, loadedSources, loadSources]);

  useEffect(() => {
    const yearStr = year ? year : "general";
    const sourceKey = `@oca/${id}${yearStr}`;

    if (loadedSources.has(sourceKey)) {
      if (map && !map.getLayer(sourceKey)) {
        setLoading(true);
        cleanOcaLayers(map);
        addPopupEffect(id, yearStr);
        showOcaLayer(map, sourceKey);
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, year, loadedSources]);

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
