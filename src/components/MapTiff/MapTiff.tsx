"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Wrapper } from "./MapTiff.styles";

const MapTiff = ({
  nameImage,
  yearImage,
}: {
  nameImage: string;
  yearImage?: string;
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      setMap(
        new maplibregl.Map({
          container: mapContainer.current,
          style:
            "https://api.maptiler.com/maps/62c23275-4909-4d2b-a4e5-b810038e77df/style.json?key=71L2QPZ0FHRofxg3QtVC",
          center: [-55, -15],
          zoom: 3.6,
        }),
      );

      return () => {
        map?.remove();
      };
    }
  }, []);

  useEffect(() => {
    const loadLayer = async (nameImage: string, yearImage: string) => {
      if (!map?.getSource(nameImage + yearImage)) {
        const response = await fetch(
          `/api/ee?nameImage=${nameImage}&yearImage=${yearImage}`,
        );
        const { url } = await response.json();

        map?.addSource(nameImage + yearImage, {
          type: "raster",
          tiles: [url],
          tileSize: 256,
        });
      }

      map?.addLayer({
        type: "raster",
        source: nameImage + yearImage,
        id: nameImage + yearImage,
      });
    };

    loadLayer(
      nameImage,
      yearImage !== undefined && yearImage !== "" ? yearImage : "general",
    );

    return () => {
      if (map?.getLayer(nameImage)) {
        map?.removeLayer(nameImage);
      }
    };
  }, [nameImage, yearImage, map]);

  useEffect(() => {
    map?.addControl(new maplibregl.NavigationControl(), "bottom-left");
  }, [map]);

  return <Wrapper ref={mapContainer} />;
};

export default MapTiff;
