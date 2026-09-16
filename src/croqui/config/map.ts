// Initial map setup, derived from src/croqui/data/municipios_c5_meta.json.
// Hard-coded so the MapView doesn't need to fetch the meta file before init.

import meta from "@/croqui/data/municipios_c5_meta.json";

export const MAP_INIT = {
  center: meta.center as [number, number],
  bbox: meta.bbox as [number, number, number, number],
  zoom: 5,
  minZoom: 3,
  maxZoom: 18,
  bearing: 0,
  pitch: 0,
};

// Blank style — the basemap is added as a raster layer at the bottom (see
// config/basemaps.ts), so all providers (incl. satellite) are handled uniformly
// and switching is a simple source/layer swap.
import type { StyleSpecification } from "maplibre-gl";

export const BLANK_STYLE: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#eceae3" },
    },
  ],
};

export const MUNICIPIOS_C5_URL = "/data/municipios_c5.geojson";

export const MUNICIPIOS_META = meta;
