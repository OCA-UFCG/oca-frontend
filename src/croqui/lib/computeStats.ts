// Pure geometry + overlay stats via Turf. Synchronous, no backend.
// Works over an array of drawn polygons (the user may draw several).

import area from "@turf/area";
import length from "@turf/length";
import centroid from "@turf/centroid";
import bbox from "@turf/bbox";
import booleanIntersects from "@turf/boolean-intersects";
import intersect from "@turf/intersect";
import union from "@turf/union";
import { featureCollection, multiPolygon } from "@turf/helpers";
import type { Feature, Polygon, MultiPolygon, Geometry, GeoJsonProperties } from "geojson";

import type {
  DrawnFeature,
  GeometryStats,
  LayerOverlay,
  LayerOverlayItem,
  MunicipioFeature,
  MunicipioOverlay,
  PolygonResults,
} from "@/croqui/types";

type PolyFeature = Feature<Polygon | MultiPolygon>;

const M2_PER_HA = 10_000;

/** Merge every drawn polygon into a single MultiPolygon for area/overlay math. */
function combine(features: DrawnFeature[]): Feature<MultiPolygon> {
  return multiPolygon(features.map((f) => f.geometry.coordinates));
}

// ─── Geometry ─────────────────────────────────────────────────────────────────

export function computeGeometryStats(features: DrawnFeature[]): GeometryStats {
  const combined = combine(features);
  const m2 = area(combined);

  // Perimeter & vertices: walk every ring of every polygon.
  let perimeterKm = 0;
  let vertexCount = 0;
  for (const f of features) {
    for (const ring of f.geometry.coordinates) {
      perimeterKm += length(
        { type: "Feature", geometry: { type: "LineString", coordinates: ring }, properties: {} },
        { units: "kilometers" }
      );
      vertexCount += Math.max(0, ring.length - 1); // closing point repeats first
    }
  }

  const c = centroid(combined).geometry.coordinates as [number, number];
  const bb = bbox(combined) as [number, number, number, number];

  return {
    areaHa: m2 / M2_PER_HA,
    perimeterKm,
    centroid: c,
    bbox: bb,
    vertexCount,
    polygonCount: features.length,
  };
}

// ─── Overlay with class-5 municipalities ─────────────────────────────────────

/**
 * For each class-5 municipality the drawing touches, the real intersection area
 * (geodesic, via @turf/intersect + @turf/area) in hectares plus its share of the
 * drawn area. Sorted by area, largest first.
 */
function computeMunicipioOverlay(
  combined: Feature<MultiPolygon>,
  drawnAreaM2: number,
  municipios: MunicipioFeature[]
): MunicipioOverlay[] {
  if (drawnAreaM2 <= 0) return [];

  const hits: MunicipioOverlay[] = [];
  for (const m of municipios) {
    if (!booleanIntersects(combined, m)) continue;

    let interM2 = 0;
    try {
      const clipped = intersect(
        featureCollection([combined as PolyFeature, m as PolyFeature])
      );
      if (clipped) interM2 = area(clipped);
    } catch {
      interM2 = 0; // touching edges / topology hiccup → treat as no overlap
    }
    if (interM2 <= 0) continue;

    hits.push({
      CD_MUN: m.properties.CD_MUN,
      NM_MUN: m.properties.NM_MUN,
      NM_UF: m.properties.NM_UF,
      areaHa: interM2 / M2_PER_HA,
      pctOfDrawn: (interM2 / drawnAreaM2) * 100,
    });
  }
  return hits.sort((a, b) => b.areaHa - a.areaHa);
}

/** Count drawn polygons that lie entirely outside every C5 municipality. */
function countInvalidPolygons(
  features: DrawnFeature[],
  municipios: MunicipioFeature[]
): number {
  let invalid = 0;
  for (const f of features) {
    const insideAny = municipios.some((m) => booleanIntersects(f, m));
    if (!insideAny) invalid++;
  }
  return invalid;
}

// ─── Generic overlay with a thematic vector layer ────────────────────────────
// Used for terras indígenas, quilombolas, assentamentos, imóveis rurais, …
// Polygon layers report intersection area; point layers report a hit count.

export type OverlayFeature = Feature<Geometry, GeoJsonProperties>;

export interface OverlayLayerInput {
  layerId: string;
  layerName: string;
  color: string;
  /** Property whose value labels each feature in the breakdown. */
  nameProp?: string;
  features: OverlayFeature[];
}

const MAX_ITEMS = 8;

export function computeLayerOverlay(
  combined: Feature<MultiPolygon>,
  drawnAreaM2: number,
  layer: OverlayLayerInput
): LayerOverlay {
  const label = (props: GeoJsonProperties): string => {
    const v = layer.nameProp ? props?.[layer.nameProp] : undefined;
    return v != null && String(v).trim() !== "" ? String(v) : "(sem nome)";
  };

  const isPointLayer = layer.features.every((f) => {
    const t = f.geometry?.type;
    return t === "Point" || t === "MultiPoint";
  });

  const items: LayerOverlayItem[] = [];
  const clips: Feature<Polygon | MultiPolygon>[] = [];
  let featureCount = 0;

  for (const f of layer.features) {
    if (!f.geometry) continue;
    if (!booleanIntersects(combined, f)) continue;
    featureCount++;

    const t = f.geometry.type;
    const areal = t === "Polygon" || t === "MultiPolygon";
    if (!areal) {
      // Point / line layers: just record the hit (no area).
      items.push({ name: label(f.properties), areaHa: 0, pctOfDrawn: 0 });
      continue;
    }

    let clipped: Feature<Polygon | MultiPolygon> | null = null;
    try {
      clipped = intersect(featureCollection([combined as PolyFeature, f as PolyFeature]));
    } catch {
      clipped = null;
    }
    if (!clipped) continue;
    const interM2 = area(clipped);
    if (interM2 <= 0) continue;
    clips.push(clipped);
    items.push({
      name: label(f.properties),
      areaHa: interM2 / M2_PER_HA,
      pctOfDrawn: drawnAreaM2 > 0 ? Math.min(100, (interM2 / drawnAreaM2) * 100) : 0,
    });
  }

  items.sort((a, b) => b.areaHa - a.areaHa);

  // Total intersected area = area of the UNION of the clipped pieces, NOT the
  // sum — overlapping features (very common in the CAR, and minor simplification
  // slivers between adjacent territories) would otherwise be double-counted and
  // push the total past the drawn area (>100%).
  let totalM2 = 0;
  if (clips.length === 1) {
    totalM2 = area(clips[0]);
  } else if (clips.length > 1) {
    try {
      const u = union(featureCollection(clips));
      totalM2 = u ? area(u) : clips.reduce((s, c) => s + area(c), 0);
    } catch {
      totalM2 = clips.reduce((s, c) => s + area(c), 0);
    }
  }
  totalM2 = Math.min(totalM2, drawnAreaM2); // guard against float/precision spill

  return {
    layerId: layer.layerId,
    layerName: layer.layerName,
    color: layer.color,
    kind: isPointLayer ? "point" : "polygon",
    featureCount,
    areaHa: totalM2 / M2_PER_HA,
    pctOfDrawn: drawnAreaM2 > 0 ? Math.min(100, (totalM2 / drawnAreaM2) * 100) : 0,
    items: items.slice(0, MAX_ITEMS),
  };
}

// ─── Composite ───────────────────────────────────────────────────────────────

export function computePolygonResults(
  features: DrawnFeature[],
  municipios: MunicipioFeature[],
  overlayLayers: OverlayLayerInput[] = []
): PolygonResults {
  const geometry = computeGeometryStats(features);
  const combined = combine(features);
  const drawnAreaM2 = geometry.areaHa * M2_PER_HA;

  const municipiosOverlay = computeMunicipioOverlay(combined, drawnAreaM2, municipios);
  const insideHa = municipiosOverlay.reduce((s, m) => s + m.areaHa, 0);
  const outsideAreaHa = Math.max(0, geometry.areaHa - insideHa);
  const outsidePct = geometry.areaHa > 0 ? (outsideAreaHa / geometry.areaHa) * 100 : 0;

  const layers = overlayLayers.map((l) =>
    computeLayerOverlay(combined, drawnAreaM2, l)
  );

  return {
    geometry,
    municipios: municipiosOverlay,
    outsideAreaHa,
    outsidePct,
    invalidCount: countInvalidPolygons(features, municipios),
    layers,
  };
}
