// Croqui mini-report (PDF): map image + geometry + crossings + vertex tables.
// Built programmatically with jsPDF (+ autotable), lazily imported so it stays
// out of the initial bundle. The map is the only raster (via captureMapToCanvas);
// everything else is selectable text/tables, so the file stays small — unlike the
// old html2canvas-of-the-page flow that produced 200+ broken pages.

import type { jsPDF as JsPdf } from "jspdf";
import type { UserOptions } from "jspdf-autotable";
import type { PolygonResults, DrawnFeature } from "@/croqui/types";
import type { ExportMeta } from "@/croqui/lib/saveExport";
import { captureMapToCanvas } from "@/croqui/lib/mapInstance";
import {
  formatHa,
  formatPct,
  coord6,
  MAX_DRAW_AREA_HA,
} from "@/croqui/lib/format";

interface ExportOpts {
  results: PolygonResults;
  drawnFeatures: DrawnFeature[];
  meta?: ExportMeta;
}

type RGB = [number, number, number];
const MARGIN = 14;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - 2 * MARGIN;

const SAGE: RGB = [90, 104, 67];
const TEXT: RGB = [42, 42, 38];
const MUTED: RGB = [107, 107, 98];
const DANGER: RGB = [176, 74, 58];
const HEAD_FILL: RGB = [243, 241, 235];
const BORDER: RGB = [210, 205, 188];

export async function exportCroquiPdf({
  results,
  drawnFeatures,
  meta,
}: ExportOpts): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const finalY = () =>
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY ?? MARGIN;

  let y = await drawHeader(doc, meta);

  // ── Map ────────────────────────────────────────────────────────────────────
  try {
    const canvas = await captureMapToCanvas();
    const ratio = canvas.width / canvas.height;
    let w = CONTENT_W;
    let h = w / ratio;
    const maxH = 92;
    if (h > maxH) {
      h = maxH;
      w = h * ratio;
    }
    const x = MARGIN + (CONTENT_W - w) / 2;

    // JPEG + downscale keeps the PDF small (a full-res PNG of the WebGL canvas
    // was ~14 MB; this brings it under ~1 MB).
    doc.addImage(canvasToJpeg(canvas), "JPEG", x, y, w, h);
    doc.setDrawColor(...BORDER);
    doc.setLineWidth(0.2);
    doc.rect(x, y, w, h);
    y += h + 6;
  } catch {
    // Map not capturable — keep the rest of the report.
  }

  // ── Geometria ────────────────────────────────────────────────────────────
  y = heading(doc, y, "Geometria");
  const g = results.geometry;
  const geomLines = [
    `Área: ${formatHa(g.areaHa)}`,
    `Perímetro: ${g.perimeterKm.toFixed(2).replace(".", ",")} km`,
    `Vértices: ${g.vertexCount}`,
    `Polígonos: ${g.polygonCount}`,
    `Centroide: ${coord6(g.centroid[1])} ${g.centroid[1] < 0 ? "S" : "N"}, ${coord6(g.centroid[0])} ${g.centroid[0] < 0 ? "W" : "E"}`,
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT);
  for (const line of geomLines) {
    y = ensureSpace(doc, y, 6);
    doc.text(line, MARGIN, y);
    y += 5.5;
  }
  if (g.areaHa > MAX_DRAW_AREA_HA) {
    y = mutedLine(
      doc,
      y,
      `Atenção: a área total ultrapassa o limite de ${MAX_DRAW_AREA_HA} ha.`,
      DANGER,
    );
  }
  y += 3;

  // ── Municípios cruzados ────────────────────────────────────────────────────
  y = heading(doc, y, `Municípios cruzados (${results.municipios.length})`);
  const munBody = results.municipios.map((m) => [
    m.NM_MUN,
    m.NM_UF,
    formatHa(m.areaHa),
    formatPct(m.pctOfDrawn),
  ]);
  if (results.outsideAreaHa >= 0.1) {
    munBody.push([
      "Fora dos municípios C5",
      "",
      formatHa(results.outsideAreaHa),
      formatPct(results.outsidePct),
    ]);
  }
  if (munBody.length === 0) {
    y = mutedLine(
      doc,
      y,
      "Nenhum polígono intersecta município de alta prioridade (C5).",
    );
  } else {
    autoTable(doc, {
      startY: y,
      head: [["Município", "UF", "Área", "%"]],
      body: munBody,
      ...tableStyle(),
      columnStyles: { 2: { halign: "right" }, 3: { halign: "right" } },
    });
    y = finalY() + 6;
  }

  // ── Cruzamentos temáticos ──────────────────────────────────────────────────
  for (const layer of results.layers) {
    y = heading(
      doc,
      y,
      `${layer.layerName} (${layer.loading ? "…" : layer.featureCount})`,
      hexToRgb(layer.color),
    );
    if (layer.loading) {
      y = mutedLine(
        doc,
        y,
        "Consulta ao GeoServer não concluída no momento da exportação.",
      );
      continue;
    }
    if (layer.error) {
      y = mutedLine(doc, y, layer.error, DANGER);
      continue;
    }
    if (layer.featureCount === 0) {
      y = mutedLine(doc, y, "Nenhum cruzamento com o polígono.");
      continue;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT);
    y = ensureSpace(doc, y, 6);
    doc.text(
      `Área cruzada: ${formatHa(layer.areaHa)} · ${formatPct(layer.pctOfDrawn)}`,
      MARGIN,
      y,
    );
    y += 5.5;
    if (layer.items.length > 0) {
      autoTable(doc, {
        startY: y,
        head: [["Feição", "Área", "%"]],
        body: layer.items.map((it) => [
          it.name,
          formatHa(it.areaHa),
          formatPct(it.pctOfDrawn),
        ]),
        ...tableStyle(),
        columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
      });
      y = finalY() + 2;
      if (layer.featureCount > layer.items.length) {
        y = mutedLine(
          doc,
          y,
          `+${layer.featureCount - layer.items.length} outros…`,
        );
      }
    }
    if (layer.note) y = mutedLine(doc, y, layer.note);
    y += 3;
  }

  // ── Vértices ───────────────────────────────────────────────────────────────
  y = heading(doc, y, "Vértices dos polígonos");
  drawnFeatures.forEach((f, i) => {
    const ring = f.geometry.coordinates[0] ?? [];
    const closed =
      ring.length > 1 &&
      ring[0][0] === ring[ring.length - 1][0] &&
      ring[0][1] === ring[ring.length - 1][1];
    const pts = closed ? ring.slice(0, -1) : ring;
    y = ensureSpace(doc, y, 12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...TEXT);
    doc.text(`Polígono ${i + 1} — ${pts.length} vértices`, MARGIN, y);
    y += 2;
    autoTable(doc, {
      startY: y,
      head: [["#", "Latitude", "Longitude"]],
      body: pts.map((p, j) => [String(j + 1), coord6(p[1]), coord6(p[0])]),
      ...tableStyle(),
      columnStyles: {
        0: { cellWidth: 14 },
        1: { halign: "right" },
        2: { halign: "right" },
      },
    });
    y = finalY() + 5;
  });

  // ── Footer (page numbers + sources) ─────────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...MUTED);
    doc.text(
      "Fontes: OpenStreetMap · Carto · FUNAI · INCRA · SICAR/CAR",
      MARGIN,
      PAGE_H - 8,
    );
    doc.text(`Página ${i}/${pages}`, PAGE_W - MARGIN, PAGE_H - 8, {
      align: "right",
    });
  }

  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 13);
  doc.save(`croqui-${stamp}.pdf`);
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────

// Downscale + JPEG-encode the map canvas to keep the PDF small.
function canvasToJpeg(
  src: HTMLCanvasElement,
  maxW = 1400,
  quality = 0.82,
): string {
  const scale = Math.min(1, maxW / src.width);
  if (scale === 1) return src.toDataURL("image/jpeg", quality);
  const c = document.createElement("canvas");
  c.width = Math.round(src.width * scale);
  c.height = Math.round(src.height * scale);
  const ctx = c.getContext("2d");
  if (!ctx) return src.toDataURL("image/jpeg", quality);
  ctx.fillStyle = "#ffffff"; // JPEG has no alpha — avoid black on any transparency
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(src, 0, 0, c.width, c.height);

  return c.toDataURL("image/jpeg", quality);
}

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);

  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function tableStyle(): Partial<UserOptions> {
  return {
    theme: "grid",
    margin: { left: MARGIN, right: MARGIN },
    styles: {
      fontSize: 8,
      cellPadding: 1.6,
      lineColor: BORDER,
      lineWidth: 0.1,
      textColor: TEXT,
    },
    headStyles: { fillColor: HEAD_FILL, textColor: SAGE, fontStyle: "bold" },
  };
}

function heading(
  doc: JsPdf,
  y: number,
  text: string,
  color: RGB = SAGE,
): number {
  y = ensureSpace(doc, y, 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...color);
  doc.text(text, MARGIN, y);
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, y + 1.5, PAGE_W - MARGIN, y + 1.5);

  return y + 6.5;
}

function mutedLine(
  doc: JsPdf,
  y: number,
  text: string,
  color: RGB = MUTED,
): number {
  y = ensureSpace(doc, y, 6);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(text, CONTENT_W) as string[];
  doc.text(lines, MARGIN, y);

  return y + lines.length * 4.5 + 1.5;
}

function ensureSpace(doc: JsPdf, y: number, needed: number): number {
  if (y + needed > PAGE_H - 14) {
    doc.addPage();

    return MARGIN + 6;
  }

  return y;
}

async function drawHeader(doc: JsPdf, meta?: ExportMeta): Promise<number> {
  // Title starts to the RIGHT of the actual logo width (the OCA logo is wide),
  // so it never overlaps it.
  let titleX = MARGIN;
  try {
    const logo = await loadImage("/logo-observatorio.png");
    let h = 14;
    let w = logo.naturalWidth * (h / logo.naturalHeight);
    const maxW = 52;
    if (w > maxW) {
      w = maxW;
      h = logo.naturalHeight * (w / logo.naturalWidth);
    }
    doc.addImage(logo, "PNG", MARGIN, 9, w, h);
    titleX = MARGIN + w + 6;
  } catch {
    // no logo — title sits at the left margin
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...SAGE);
  doc.text("Croqui de Análise", titleX, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Observatório da Caatinga e Desertificação", titleX, 20.5);
  if (meta?.nome) {
    const by =
      "Elaborado por: " +
      meta.nome +
      (meta.instituicao ? ` — ${meta.instituicao}` : "");
    doc.setFontSize(8.5);
    doc.setTextColor(...TEXT);
    doc.text(by, titleX, 25);
  }
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    `Gerado em ${new Date().toLocaleString("pt-BR")}`,
    PAGE_W - MARGIN,
    11,
    {
      align: "right",
    },
  );
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, 28, PAGE_W - MARGIN, 28);

  return 34;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
