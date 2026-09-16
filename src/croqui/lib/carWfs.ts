// Imóveis Rurais (CAR/SICAR) loaded live from the official GeoServer via WFS.
// There is no national layer — features are split per-UF (sicar:sicar_imoveis_<uf>),
// so we derive the UF(s) from the C5 municipalities the drawing / viewport covers.
// The GeoServer reflects the request Origin in Access-Control-Allow-Origin, so
// these browser fetches work from localhost and from the static deploy alike.

import area from "@turf/area";
import bbox from "@turf/bbox";
import { multiPolygon } from "@turf/helpers";
import type { Feature, MultiPolygon } from "geojson";
import type {
  DrawnFeature,
  LayerOverlay,
  MunicipioOverlay,
} from "@/croqui/types";
import { computeLayerOverlay, type OverlayFeature } from "./computeStats";

/** Full UF name (as in the municipios GeoJSON) → IBGE sigla used by SICAR. */
export const UF_SIGLA: Record<string, string> = {
  Acre: "ac",
  Alagoas: "al",
  Amapá: "ap",
  Amazonas: "am",
  Bahia: "ba",
  Ceará: "ce",
  "Distrito Federal": "df",
  "Espírito Santo": "es",
  Goiás: "go",
  Maranhão: "ma",
  "Mato Grosso": "mt",
  "Mato Grosso do Sul": "ms",
  "Minas Gerais": "mg",
  Pará: "pa",
  Paraíba: "pb",
  Paraná: "pr",
  Pernambuco: "pe",
  Piauí: "pi",
  "Rio de Janeiro": "rj",
  "Rio Grande do Norte": "rn",
  "Rio Grande do Sul": "rs",
  Rondônia: "ro",
  Roraima: "rr",
  "Santa Catarina": "sc",
  "São Paulo": "sp",
  Sergipe: "se",
  Tocantins: "to",
};

export function ufsFromNames(names: string[]): string[] {
  return Array.from(new Set(names.map((n) => UF_SIGLA[n]).filter(Boolean)));
}

/** Fetch CAR features intersecting `bboxStr` for each UF, merged. */
export async function fetchCarFeatures(
  wfsUrl: string,
  typePrefix: string,
  ufs: string[],
  bboxStr: string,
  maxFeatures: number,
  signal?: AbortSignal,
): Promise<Feature[]> {
  const all: Feature[] = [];
  for (const uf of ufs) {
    const url =
      `${wfsUrl}?service=WFS&version=1.0.0&request=GetFeature` +
      `&typeName=${encodeURIComponent(typePrefix + uf)}` +
      `&outputFormat=application/json&srsName=EPSG:4326` +
      `&bbox=${bboxStr}` +
      `&maxFeatures=${maxFeatures}`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`WFS ${res.status}`);
    const gj = (await res.json()) as { features?: Feature[] };
    if (gj?.features?.length) all.push(...gj.features);
  }

  return all;
}

interface CarConfig {
  layerId: string;
  layerName: string;
  color: string;
  nameProp?: string;
  wfsUrl: string;
  wfsTypePrefix: string;
  maxFeatures?: number;
}

/**
 * Cross the drawing with the CAR. Per the design we report only the imóvel
 * COUNT and total intersected AREA (no per-feature listing). UFs come from the
 * C5 municipalities the drawing touches; if it touches none, returns empty.
 */
export async function queryCarOverlay(
  features: DrawnFeature[],
  municipios: MunicipioOverlay[],
  cfg: CarConfig,
  signal?: AbortSignal,
): Promise<LayerOverlay> {
  const empty: LayerOverlay = {
    layerId: cfg.layerId,
    layerName: cfg.layerName,
    color: cfg.color,
    kind: "polygon",
    featureCount: 0,
    areaHa: 0,
    pctOfDrawn: 0,
    items: [],
    loading: false,
  };

  const ufs = ufsFromNames(municipios.map((m) => m.NM_UF));
  if (ufs.length === 0) return empty;

  const combined = multiPolygon(
    features.map((f) => f.geometry.coordinates),
  ) as Feature<MultiPolygon>;
  const drawnAreaM2 = area(combined);
  const [minx, miny, maxx, maxy] = bbox(combined);
  const bboxStr = `${minx},${miny},${maxx},${maxy},EPSG:4326`;
  const max = cfg.maxFeatures ?? 4000;

  const feats = await fetchCarFeatures(
    cfg.wfsUrl,
    cfg.wfsTypePrefix,
    ufs,
    bboxStr,
    max,
    signal,
  );

  // If the fetch saturated the cap, the count/area may be undercounted.
  const capped = feats.length >= max * ufs.length;

  const overlay = computeLayerOverlay(combined, drawnAreaM2, {
    layerId: cfg.layerId,
    layerName: cfg.layerName,
    color: cfg.color,
    nameProp: cfg.nameProp,
    features: feats as OverlayFeature[],
  });

  // CAR: count + area only, no per-feature list.
  return {
    ...overlay,
    items: [],
    loading: false,
    note: capped ? `amostra limitada a ${max}/UF` : undefined,
  };
}
