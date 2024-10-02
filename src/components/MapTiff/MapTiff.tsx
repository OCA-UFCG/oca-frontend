"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { MAP_TIFF_STYLE, MAP_TIFF_BRAZIL_CITIES } from "@/utils/constants";
import { CMSContext } from "@/contexts/ContentProvider";

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

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

  const loadMap = useCallback(() => {
    if (mapContainer.current) {
      const newMap = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_TIFF_STYLE,
        center: [-55, -15],
        zoom: 3.6,
        maxZoom: 10,
        minZoom: 3.6,
      });

      newMap.on("load", () => {
        newMap.addControl(new maplibregl.NavigationControl(), "bottom-left");

        // ==== Add Brazil states =====
        newMap.addSource("brazil-states", {
          type: "geojson",
          data: "/fc_final.geojson",
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

        // ==== Add Brazil states borders =====
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

        // ==== Add Brazil cities =====
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
  }, []);

  const loadLayer = useCallback(
    async (name: string, year: string) => {
      setLoading(true);
      if (!map?.getSource(name + year) && mapsData.length > 0) {
        const body = JSON.stringify(
          mapsData.filter((data) => data.fields.id === name)[0].fields,
        );

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
        } else {
          const { url } = await response.json();
          if (!map?.getSource(name + year)) {
            map?.addSource(name + year, {
              type: "raster",
              tiles: [url],
              tileSize: 256,
            });
          }
        }
      }

      let firstSymbolId;
      if (map && map.getStyle()) {
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
        setLoading(false);
      }
    },
    [map, mapsData, setLoading],
  );

  const loadFeatureCollection = useCallback(
    (name: string, year: string) => {
      // ==== Add hover effect on Brazil states =====
      let hoveredStateId: string | number | undefined = undefined;
      const popupContainer = document.createElement("div");
      const root = createRoot(popupContainer);

      map?.on("mousemove", "state-fills", (e) => {
        if (e.features && e.features.length > 0) {
          if (hoveredStateId) {
            map?.setFeatureState(
              { source: "brazil-states", id: hoveredStateId },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map?.setFeatureState(
            { source: "brazil-states", id: hoveredStateId },
            { hover: true },
          );

          const properties = e.features[0].properties;
          const propertiesTIFF = JSON.parse(properties[name + year]);

          const atualData = mapsData.filter(
            (data) => data.fields.id === name,
          )[0].fields;

          const colors = atualData.imageData[year]?.imageParams.map(
            (param) => param.color,
          );

          const areas = [
            {
              area: propertiesTIFF.Area_km2_1,
              color: colors[0],
              percent: propertiesTIFF.Percent_1,
            },
            {
              area: propertiesTIFF.Area_km2_2,
              color: colors[1],
              percent: propertiesTIFF.Percent_2,
            },
            {
              area: propertiesTIFF.Area_km2_3,
              color: colors[2],
              percent: propertiesTIFF.Percent_3,
            },
            {
              area: propertiesTIFF.Area_km2_4,
              color: colors[3],
              percent: propertiesTIFF.Percent_4,
            },
            {
              area: propertiesTIFF.Area_km2_5,
              color: colors[4],
              percent: propertiesTIFF.Percent_5,
            },
            {
              area: propertiesTIFF.Area_km2_6,
              color: colors[5],
              percent: propertiesTIFF.Percent_6,
            },
          ];

          root.render(
            <PopupContent>
              <TopHeader>
                <Title>{properties.NM_UF}</Title>
                <Subtitle>{atualData.name}</Subtitle>
              </TopHeader>
              {areas
                .filter(({ area }) => area && area > 0) // Filtra os valores que têm percent maior que 0
                .map((areaInfo, index) => (
                  <LineInfo key={index}>
                    <TotalArea>{areaInfo.area?.toFixed(0)}Km²</TotalArea>
                    <Color color={areaInfo.color} />
                    <PercentArea>{areaInfo.percent?.toFixed(0)}%</PercentArea>
                  </LineInfo>
                ))}
            </PopupContent>,
          );

          popupRef.current
            .setLngLat(e.lngLat)
            .setDOMContent(popupContainer)
            .addTo(map);
        }
      });

      map?.on("mouseleave", "state-fills", () => {
        if (hoveredStateId) {
          map?.setFeatureState(
            { source: "brazil-states", id: hoveredStateId },
            { hover: false },
          );
        }
        hoveredStateId = undefined;
        popupRef.current.remove();
      });
    },
    [map],
  );

  useEffect(() => {
    if (name) {
      const yearStr = year || "general";

      if (!map) {
        loadMap();
      }

      loadLayer(name, yearStr);
      loadFeatureCollection(name, yearStr);

      return () => {
        if (map?.getLayer(name + yearStr)) {
          map?.removeLayer(name + yearStr);
        }
      };
    }
  }, [name, year, map, loadLayer, loadMap, loadFeatureCollection]);

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
