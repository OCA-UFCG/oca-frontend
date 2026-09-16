// Single source of truth for the layers the app exposes.
// All vector, served as static GeoJSON read & analysed client-side — no server.
//   • municipios-c5 — the study-area base / validation layer.
//   • thematic overlay layers (terras indígenas, quilombolas, assentamentos,
//     imóveis rurais) the drawing is crossed against (`overlay: true`).

export interface RasterClass {
  value: number;
  label: string;
  color: string;
}

// Kept for the (currently empty) RASTER_LAYERS slot in the layers panel.
export interface CogRasterLayer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  cogPath: string;
  nodata: number;
  pixelSizeLabel: string;
  classes: RasterClass[];
  defaultVisible: boolean;
  defaultOpacity: number;
}

export interface VectorLayer {
  id: string;
  name: string;
  shortName: string;
  description: string;
  url: string;
  promoteId: string;
  defaultVisible: boolean;
  defaultOpacity: number;
  color: string;
  /** Whether the drawing is crossed against this layer for stats. */
  overlay?: boolean;
  /** Feature property used as the display name in the crossing breakdown. */
  nameProp?: string;
  /** Geometry kind — controls rendering (fill vs circle) and stats display. */
  geomType?: "polygon" | "point";
  /** "geojson" (static file under /public, default) or "wfs" (live GeoServer). */
  source?: "geojson" | "wfs";
  /** WFS base URL (when source: "wfs"). */
  wfsUrl?: string;
  /** WFS typeName prefix; the UF sigla is appended (e.g. "sicar:sicar_imoveis_"). */
  wfsTypePrefix?: string;
  /** Min map zoom before WFS features are fetched for display. */
  minZoomForLoad?: number;
  /** Max features per WFS request. */
  maxFeatures?: number;
}

// ─── Vector layers ───────────────────────────────────────────────────────────
export const VECTOR_LAYERS: VectorLayer[] = [
  {
    id: "municipios-c5",
    name: "Municípios C5 — Alta Prioridade",
    shortName: "Alta Prioridade (C5)",
    description:
      "249 municípios de alta prioridade (C5) para combate à desertificação, distribuídos em 9 UFs do semiárido brasileiro.",
    url: "/data/municipios_c5.geojson",
    promoteId: "CD_MUN",
    defaultVisible: true,
    defaultOpacity: 100,
    color: "#dc2626",
  },

  // ─── Thematic overlay layers (crossed against the drawing) ──────────────────
  {
    id: "terras-indigenas",
    name: "Terras Indígenas",
    shortName: "Terras Indígenas",
    description:
      "Terras indígenas (FUNAI), recortadas nos municípios C5 do bioma Caatinga.",
    url: "/data/territorios_indigenas.geojson",
    promoteId: "terrai_cod",
    defaultVisible: false,
    defaultOpacity: 80,
    color: "#ea580c",
    overlay: true,
    nameProp: "terrai_nom",
    geomType: "polygon",
  },
  {
    id: "territorios-quilombolas",
    name: "Territórios Quilombolas",
    shortName: "Quilombolas",
    description:
      "Territórios quilombolas (INCRA), recortados nos municípios C5 do bioma Caatinga.",
    url: "/data/territorios_quilombolas.geojson",
    promoteId: "cd_quilomb",
    defaultVisible: false,
    defaultOpacity: 80,
    color: "#7c3aed",
    overlay: true,
    nameProp: "nm_comunid",
    geomType: "polygon",
  },
  {
    id: "assentamentos",
    name: "Assentamentos (INCRA)",
    shortName: "Assentamentos",
    description:
      "Projetos de assentamento (INCRA), recortados nos municípios C5 do bioma Caatinga.",
    url: "/data/assentamentos.geojson",
    promoteId: "cd_sipra",
    defaultVisible: false,
    defaultOpacity: 80,
    color: "#0d9488",
    overlay: true,
    nameProp: "nome_proje",
    geomType: "polygon",
  },
  {
    id: "imoveis-rurais",
    name: "Imóveis Rurais (CAR)",
    shortName: "Imóveis Rurais",
    description:
      "Cadastro Ambiental Rural (SICAR), ao vivo do GeoServer. Cobre todas as UFs; aparece no mapa com zoom ≥ 12.",
    url: "",
    source: "wfs",
    wfsUrl: "https://geoserver.car.gov.br/geoserver/sicar/ows",
    wfsTypePrefix: "sicar:sicar_imoveis_",
    minZoomForLoad: 12,
    maxFeatures: 4000,
    promoteId: "cod_imovel",
    defaultVisible: false,
    defaultOpacity: 70,
    color: "#2563eb",
    overlay: true,
    nameProp: "municipio",
    geomType: "polygon",
  },
];

// Convenience views over the layer list.
export const OVERLAY_LAYERS: VectorLayer[] = VECTOR_LAYERS.filter((l) => l.overlay);
export const STATIC_OVERLAY_LAYERS: VectorLayer[] = OVERLAY_LAYERS.filter(
  (l) => l.source !== "wfs"
);
export const WFS_OVERLAY_LAYERS: VectorLayer[] = OVERLAY_LAYERS.filter(
  (l) => l.source === "wfs"
);

// ─── Raster layers ───────────────────────────────────────────────────────────
// None for now (the IDT raster was removed). Kept as an empty slot so the layers
// panel's raster group reappears automatically if a raster is ever added back.
export const RASTER_LAYERS: CogRasterLayer[] = [];
