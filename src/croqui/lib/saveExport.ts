// Registers each croqui export to a Google Sheet via an Apps Script Web App.
// Fire-and-forget + no-cors: the request reaches the script, we don't read the
// (opaque) response, and a failure never blocks the PDF. The webhook URL lives
// in config/exportSink.ts; when empty, saving is silently skipped.

import { EXPORT_WEBHOOK_URL, EXPORT_TOKEN } from "@/croqui/config/exportSink";
import type { PolygonResults, DrawnFeature } from "@/croqui/types";

export interface ExportMeta {
  nome: string;
  instituicao?: string;
  email?: string;
  observacoes?: string;
}

function round(n: number, d: number): number {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

/** Assemble the JSON payload written to the sheet (one export). */
export function buildExportPayload(
  results: PolygonResults,
  drawnFeatures: DrawnFeature[],
  meta: ExportMeta
) {
  const g = results.geometry;
  return {
    createdAt: new Date().toISOString(),
    nome: meta.nome,
    instituicao: meta.instituicao ?? "",
    email: meta.email ?? "",
    observacoes: meta.observacoes ?? "",
    areaHa: round(g.areaHa, 2),
    perimetroKm: round(g.perimeterKm, 3),
    poligonos: g.polygonCount,
    vertices: g.vertexCount,
    centroideLat: round(g.centroid[1], 6),
    centroideLon: round(g.centroid[0], 6),
    municipios: results.municipios.map((m) => ({
      nome: m.NM_MUN,
      uf: m.NM_UF,
      areaHa: round(m.areaHa, 2),
      pct: round(m.pctOfDrawn, 1),
    })),
    outsideAreaHa: round(results.outsideAreaHa, 2),
    outsidePct: round(results.outsidePct, 1),
    layers: results.layers.map((l) => ({
      nome: l.layerName,
      featureCount: l.featureCount,
      areaHa: round(l.areaHa, 2),
      pct: round(l.pctOfDrawn, 1),
    })),
    geojson: { type: "FeatureCollection" as const, features: drawnFeatures },
  };
}

export async function saveCroquiExport(payload: object): Promise<void> {
  if (!EXPORT_WEBHOOK_URL) {
    console.info("[export] planilha não configurada — salvamento ignorado.");
    return;
  }
  try {
    await fetch(EXPORT_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: EXPORT_TOKEN, ...payload }),
    });
  } catch (err) {
    console.warn("[export] falha ao registrar na planilha:", err);
  }
}
