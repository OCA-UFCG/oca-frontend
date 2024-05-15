"use client";

import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/62c23275-4909-4d2b-a4e5-b810038e77df/style.json?key=71L2QPZ0FHRofxg3QtVC",
        center: [-55, -15],
        zoom: 3.6,
      });

      const asyncfunction = async () => {
        const response = await fetch("/api/ee");
        const { imagesUrl } = await response.json();

        map.addSource("source", {
          type: "raster",
          tiles: [imagesUrl.carbono],
          tileSize: 256,
        });

        map.addLayer({
          type: "raster",
          source: "source",
          id: "layer",
        });
      };

      asyncfunction();

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default MapPage;
