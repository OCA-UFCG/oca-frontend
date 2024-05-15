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

      const asyncfunction = async (nameImage: string) => {
        const response = await fetch(`/api/ee?name=${nameImage}`);
        const { url } = await response.json();

        map.addSource(nameImage, {
          type: "raster",
          tiles: [url],
          tileSize: 256,
        });

        map.addLayer({
          type: "raster",
          source: nameImage,
          id: nameImage,
        });
      };

      const nameImage = "carbono";
      asyncfunction(nameImage);

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh" }} />;
};

export default MapPage;
