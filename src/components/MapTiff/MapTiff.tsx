"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wrapper } from "./MapTiff.styles";
import { IMapInfo } from "@/utils/interfaces";

const MapTiff = ({
  data,
  onClick,
  ...props
}: {
  data: IMapInfo;
  onClick?: (e: any) => void;
}) => {
  const { name, year } = data;
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const loadMap = useCallback(() => {
    if (mapContainer.current) {
      const newMap = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/basic-v2/style.json?key=71L2QPZ0FHRofxg3QtVC",
        center: [-55, -15],
        zoom: 3.6,
        maxZoom: 10,
        minZoom: 3.6,
      });

      newMap.on("load", () => {
        newMap.addControl(new maplibregl.NavigationControl(), "bottom-left");
      });

      setMap(newMap);
    }
  }, []);

  const loadLayer = useCallback(
    async (name: string, year: string) => {
      if (!map?.getSource(name + year)) {
        const response = await fetch(`/api/ee?name=${name}&year=${year}`);
        const { url } = await response.json();

        if (!map?.getSource(name + year)) {
          map?.addSource(name + year, {
            type: "raster",
            tiles: [url],
            tileSize: 256,
          });
        }
      }

      let firstSymbolId;
      const layers = map?.getStyle().layers || [];
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol") {
          firstSymbolId = layers[i].id;
          break;
        }
      }

      map?.addLayer(
        {
          type: "raster",
          source: name + year,
          id: name + year,
        },
        firstSymbolId,
      );
    },
    [map],
  );

  useEffect(() => {
    if (!map) {
      loadMap();
    }

    if (name) {
      const yearStr = year || "general";
      loadLayer(name, yearStr);

      return () => {
        if (map?.getLayer(name + yearStr)) {
          map?.removeLayer(name + yearStr);
        }
      };
    }
  }, [name, year, map, loadLayer, loadMap]);

  return <Wrapper {...props} onClick={onClick} ref={mapContainer} />;
};

export default MapTiff;
