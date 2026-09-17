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

// Provedores: os estilos do Carto (gratuitos para uso não comercial, até 5
// milhões de tiles/mês, mas exigem chave de API — sem ela os tiles vêm com a
// marca d'água "API KEY REQUIRED"; chave em carto.com/basemaps/apikey) e o
// Esri World Imagery como opção de satélite (uso sem conta ArcGIS, sujeito a
// termos e limites próprios). Ambos exigem a atribuição abaixo. Antes de
// esperar tráfego alto em produção, revise os termos de uso vigentes de cada
// provedor — eles podem mudar.
// OpenStreetMap e Google foram removidos: o servidor oficial do OSM não admite
// tráfego de produção, e o endpoint de tiles do Google exige a API oficial.

// NEXT_PUBLIC_*: embutida no bundle em build-time (ver .env.sample).
const CARTO_KEY = process.env.NEXT_PUBLIC_CROQUI_CARTO_API_KEY?.trim() || "";

function cartoUrl(style: string): string {
  const url = `https://basemaps.cartocdn.com/${style}/{z}/{x}/{y}.png`;

  return CARTO_KEY ? `${url}?key=${encodeURIComponent(CARTO_KEY)}` : url;
}

export const BASEMAPS: Basemap[] = [
  {
    id: "carto-positron",
    name: "Carto Positron (claro)",
    url: cartoUrl("light_all"),
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "carto-voyager",
    name: "Carto Voyager",
    url: cartoUrl("rastertiles/voyager"),
    attribution: "© OpenStreetMap · © CARTO",
    maxZoom: 19,
  },
  {
    id: "carto-dark-matter",
    name: "Carto Dark Matter (escuro)",
    url: cartoUrl("dark_all"),
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
