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

// Só provedores com uso permitido sem chave de API: os estilos do Carto e o
// Esri World Imagery como opção de satélite (ambos exigem a atribuição abaixo).
// OpenStreetMap e Google foram removidos: o servidor oficial do OSM não admite
// tráfego de produção, e o endpoint de tiles do Google exige a API oficial.
export const BASEMAPS: Basemap[] = [
  {
    id: "carto-positron",
    name: "Carto Positron (claro)",
    url: "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "carto-voyager",
    name: "Carto Voyager",
    url: "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "carto-dark-matter",
    name: "Carto Dark Matter (escuro)",
    url: "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "esri-imagery",
    name: "Esri Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri — Esri, Maxar, Earthstar Geographics",
    maxZoom: 19,
  },
];

export const DEFAULT_BASEMAP_ID = "carto-positron";

export function getBasemap(id: string): Basemap {
  return BASEMAPS.find((b) => b.id === id) ?? BASEMAPS[0];
}
