// Basemaps as uniform raster XYZ tiles. Treating every provider the same way
// keeps MapView simple: switching is just a raster source/layer swap — no style
// diff, no re-adding the municípios / overlay layers on top.

export interface Basemap {
  id: string;
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
}

export const BASEMAPS: Basemap[] = [
  {
    id: "carto-positron",
    name: "Carto Positron (claro)",
    url: "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "osm",
    name: "OpenStreetMap",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  },
  {
    id: "esri-imagery",
    name: "Esri Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Esri, Maxar, Earthstar Geographics",
    maxZoom: 19,
  },
  {
    // Google's tile endpoint is fine for internal/academic prototypes; for a
    // public production deploy review Google Maps Platform ToS.
    id: "google-sat",
    name: "Google Satélite",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    attribution: "© Google",
    maxZoom: 20,
  },
];

export const DEFAULT_BASEMAP_ID = "carto-positron";

export function getBasemap(id: string): Basemap {
  return BASEMAPS.find((b) => b.id === id) ?? BASEMAPS[0];
}
