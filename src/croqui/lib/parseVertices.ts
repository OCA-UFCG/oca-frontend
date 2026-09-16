// Parse user-supplied vertices into one or more polygon Features for the tools.
//
// Two input shapes are supported, auto-detected, and BOTH can yield several
// polygons:
//   • GeoJSON (text starting with "{"/"["): every Polygon / MultiPolygon found
//     (FeatureCollection, Feature, bare geometry); or a list of Point features /
//     a LineString as a single ring. Coordinates are [lon, lat].
//   • Plain text / CSV: one vertex per line as "lat, lon" (decimal degrees).
//     A BLANK LINE separates one polygon from the next.
//
// Output is always an array of closed GeoJSON Polygon Features ([lon, lat] rings).

import type { DrawnFeature } from "@/croqui/types";

type LonLat = [number, number];

function isFiniteNum(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

function validLonLat([lon, lat]: LonLat): boolean {
  return lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

// ─── Plain text / CSV ─────────────────────────────────────────────────────────
// One block ("lat, lon" per line) → ring. Header / junk lines are skipped.
function parseLatLonBlock(text: string): LonLat[] {
  const out: LonLat[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const nums = line
      .split(/[,;\t\s]+/)
      .map((t) => Number(t.replace(",", ".")))
      .filter(isFiniteNum);
    if (nums.length < 2) continue; // header or junk
    const [lat, lon] = nums; // user format is lat, lon
    const pt: LonLat = [lon, lat];
    if (validLonLat(pt)) out.push(pt);
  }

  return out;
}

// Blank line(s) separate polygons.
function ringsFromText(text: string): LonLat[][] {
  return text
    .split(/\r?\n\s*\r?\n+/)
    .map(parseLatLonBlock)
    .filter((r) => r.length >= 3);
}

// ─── GeoJSON ──────────────────────────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
function ringsFromGeoJson(obj: any): LonLat[][] {
  const rings: LonLat[][] = [];
  const pushPolygon = (coords: any) => {
    if (Array.isArray(coords) && Array.isArray(coords[0]))
      rings.push(coords[0] as LonLat[]);
  };
  const fromGeom = (g: any) => {
    if (!g) return;
    if (g.type === "Polygon") pushPolygon(g.coordinates);
    else if (g.type === "MultiPolygon")
      for (const poly of g.coordinates) pushPolygon(poly);
  };

  if (obj?.type === "FeatureCollection" && Array.isArray(obj.features)) {
    const polys = obj.features.filter(
      (f: any) =>
        f?.geometry?.type === "Polygon" || f?.geometry?.type === "MultiPolygon",
    );
    if (polys.length) {
      polys.forEach((f: any) => fromGeom(f.geometry));

      return rings;
    }
    const points = obj.features
      .filter((f: any) => f?.geometry?.type === "Point")
      .map((f: any) => f.geometry.coordinates as LonLat);
    if (points.length >= 3) return [points];
    const line = obj.features.find(
      (f: any) => f?.geometry?.type === "LineString",
    );
    if (line) return [line.geometry.coordinates as LonLat[]];
    throw new Error("GeoJSON sem polígono, linha ou ≥3 pontos.");
  }

  if (obj?.type === "Feature") return ringsFromGeoJson(obj.geometry);
  if (obj?.type === "Polygon" || obj?.type === "MultiPolygon") {
    fromGeom(obj);

    return rings;
  }
  if (obj?.type === "LineString") return [obj.coordinates as LonLat[]];
  if (Array.isArray(obj) && Array.isArray(obj[0])) return [obj as LonLat[]];

  throw new Error("Formato GeoJSON não reconhecido.");
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function ringToFeature(ring: LonLat[]): DrawnFeature {
  let coords = ring;
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) coords = [...coords, first];

  return {
    type: "Feature",
    properties: {},
    geometry: { type: "Polygon", coordinates: [coords] },
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function parseVerticesInput(raw: string): DrawnFeature[] {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("Nenhuma coordenada fornecida.");

  let rings: LonLat[][];
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    let obj: unknown;
    try {
      obj = JSON.parse(trimmed);
    } catch {
      throw new Error("JSON inválido.");
    }
    rings = ringsFromGeoJson(obj);
  } else {
    rings = ringsFromText(trimmed);
  }

  const valid = rings
    .map((r) => r.filter(validLonLat))
    .filter((r) => r.length >= 3);
  if (valid.length === 0) {
    throw new Error(
      "São necessários ao menos 3 vértices válidos por polígono.",
    );
  }

  return valid.map(ringToFeature);
}
