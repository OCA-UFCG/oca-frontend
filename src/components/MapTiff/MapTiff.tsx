"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MapContainer, Loading, LoadingText } from "./MapTiff.styles";
import { MAP_TIFF_STYLE, MAP_TIFF_BRAZIL_CITIES } from "@/utils/constants";
import MapPopup from "../MapPopup/MapPopup";
import { MapTiffContext } from "@/contexts/MapContext";
import { fetchMapURL } from "@/services/mapServices";

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

  const loadAdditionalSources = useCallback(
    async (map: maplibregl.Map) => {
      const yearStr = year || "general";
      for (const additionalMapData of tiffs) {
        for (const newYear of Object.keys(additionalMapData.fields.imageData)) {
          const newId = additionalMapData.fields.id;
          const sourceKey = `@oca/${newId}${newYear}`;
          if (map.getSource(sourceKey) || (newId === id && newYear === yearStr))
            continue;

          const { url } = await fetchMapURL(
            newId,
            newYear,
            JSON.stringify(additionalMapData.fields),
          );

          // Adiciona a nova fonte ao mapa
          map.addSource(sourceKey, {
            type: "raster",
            tiles: [url],
            tileSize: isReduced ? 64 : 128,
          });
        }
      }
    },
    [tiffs, id, year, isReduced],
  );

  const loadInitialSources = useCallback(
    async (map: maplibregl.Map) => {
      // === Add current raster source
      const yearStr = year ? year : "general";
      const mapData = tiffs.find((data) => data.fields.id === id)?.fields;
      const { url } = await fetchMapURL(id, yearStr, JSON.stringify(mapData));
      map.addSource(`@oca/${id}${yearStr}`, {
        type: "raster",
        tiles: [url],
        tileSize: isReduced ? 64 : 128,
      });

      // === Add Brazil states source
      map.addSource("brazil-states", {
        type: "vector",
        tiles: [`${HOST_URL}/api/tiles/{z}/{x}/{y}`],
      });

      map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "brazil-states",
        "source-layer": "brazilstates",
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
        "source-layer": "brazilstates",
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
              {
                source: "brazil-states",
                sourceLayer: "brazilstates",
                id: hoveredStateId,
              },
              { hover: false },
            );
          }

          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            {
              source: "brazil-states",
              sourceLayer: "brazilstates",
              id: hoveredStateId,
            },
            { hover: true },
          );

          const fcProperties = e.features[0].properties;
          const fcMetadata = JSON.parse(fcProperties[id + year]);
          const rasterMetadata = tiffs.filter(
            (data) => data.fields.id === id,
          )[0];

          // === Refact this in the future
          // const rasterColors = rasterMetadata.fields.imageData[
          //   year
          // ]?.imageParams.map((param: any) => param.color);
          const rasterColors =
            id === "cisterna"
              ? []
              : rasterMetadata.fields.imageData[year]?.imageParams.map(
                  (param) => param.color,
                );

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
      });

      map?.on("mouseleave", "state-fills", () => {
        if (hoveredStateId) {
          map.setFeatureState(
            {
              source: "brazil-states",
              sourceLayer: "brazilstates",
              id: hoveredStateId,
            },
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

        loadInitialSources(newMap);
        loadAdditionalSources(newMap);
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
  }, [
    isReduced,
    mapContainer,
    loadedSources,
    loadInitialSources,
    loadAdditionalSources,
  ]);

  useEffect(() => {
    const yearStr = year || "general";
    const sourceKey = `@oca/${id}${yearStr}`;

    if (loadedSources.has(sourceKey) && map && !map.getLayer(sourceKey)) {
      setLoading(true);
      cleanOcaLayers(map);
      if (!isReduced) addPopupEffect(id, yearStr);
      showOcaLayer(map, sourceKey);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, year, loadedSources]);

  useEffect(() => {
    initializeMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveModals = useCallback(() => {
    setMenuRetracted(true);
    setDescRetracted(true);
  }, [setMenuRetracted, setDescRetracted]);

  return (
    <MapContainer
      {...props}
      $loading={loading.toString()}
      onClick={retrieveModals}
      ref={mapContainer}
    >
      <LoadingText>Carregando mapa</LoadingText>
      <Loading id="loading" size={40} />
    </MapContainer>
  );
};

export default MapTiff;
