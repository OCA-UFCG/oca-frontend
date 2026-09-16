import type {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
} from "geojson";

export type DrawMode = "idle" | "polygon" | "rectangle";

export interface MunicipioProps {
  CD_MUN: string;
  NM_MUN: string;
  NM_UF: string;
  NM_REGIAO: string;
  class_electre: number;
  class_label: string;
  Priorizacao: string | null;
  class_mc_prob: number | null;
  ranking_pos: number | null;
  area_deg45_ha: number | null;
}

export type MunicipioFeature = Feature<Polygon | MultiPolygon, MunicipioProps>;
export type MunicipiosCollection = FeatureCollection<
  Polygon | MultiPolygon,
  MunicipioProps
>;

export interface GeometryStats {
  /** Total area across all drawn polygons, in hectares. */
  areaHa: number;

  /** Sum of every ring length across all polygons, in km. */
  perimeterKm: number;
  centroid: [number, number]; // [lon, lat] of the combined geometry
  bbox: [number, number, number, number];

  /** Sum of vertices across all polygons. */
  vertexCount: number;

  /** Number of polygons the user has drawn. */
  polygonCount: number;
}

export interface MunicipioOverlay {
  CD_MUN: string;
  NM_MUN: string;
  NM_UF: string;

  /** Area (hectares) of the drawn polygon that falls inside this municipality. */
  areaHa: number;

  /** % of drawn polygon area that falls inside this municipality (0–100). */
  pctOfDrawn: number;
}

/** One intersected feature inside a thematic overlay layer. */
export interface LayerOverlayItem {
  /** Display name (from the layer's `nameProp`), or a fallback label. */
  name: string;

  /** Intersection area in hectares (0 for point layers). */
  areaHa: number;

  /** % of the drawn area that this feature covers (0 for point layers). */
  pctOfDrawn: number;
}

/**
 * Result of crossing the drawn polygon(s) with one thematic vector layer
 * (terras indígenas, quilombolas, assentamentos, imóveis rurais, …).
 */
export interface LayerOverlay {
  layerId: string;
  layerName: string;
  color: string;

  /** Geometry kind of the source layer — drives how stats are presented. */
  kind: "polygon" | "point";

  /** Number of features from the layer that the drawing touches. */
  featureCount: number;

  /** Total intersection area in hectares (polygon layers only). */
  areaHa: number;

  /** % of the drawn area covered by this layer (polygon layers only). */
  pctOfDrawn: number;

  /** Top intersected features, largest first. */
  items: LayerOverlayItem[];

  /** Async (WFS) layers: true while fetching. */
  loading?: boolean;

  /** Async layers: error message if the fetch failed. */
  error?: string | null;

  /** Optional muted footnote (e.g. a sample cap). */
  note?: string;
}

export interface PolygonResults {
  geometry: GeometryStats;

  /** Class-5 municipalities the drawing crosses (area inside each). */
  municipios: MunicipioOverlay[];

  /** Area of the drawing that falls OUTSIDE every C5 municipality (hectares). */
  outsideAreaHa: number;

  /** That outside area as a % of the total drawn area. */
  outsidePct: number;

  /** How many drawn polygons fall entirely outside the C5 municipalities. */
  invalidCount: number;

  /** Crossing stats per thematic vector layer. */
  layers: LayerOverlay[];
}

export interface LayerVisibility {
  /** id → visible flag */
  [layerId: string]: boolean;
}

export interface LayerOpacity {
  /** id → 0–100 */
  [layerId: string]: number;
}

export type DrawnFeature = Feature<Polygon, Record<string, unknown>>;
