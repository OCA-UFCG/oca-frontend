// Shared number / coordinate formatting for the stats panel and the PDF report.

/** Maximum total drawn area (hectares) before a warning is shown. */
export const MAX_DRAW_AREA_HA = 50;

const _fmt0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const _fmtCoord6 = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
});

/** Hectares with sensible precision: integers when large, decimals when tiny. */
export function formatHa(ha: number): string {
  if (ha >= 100) return `${_fmt0.format(Math.round(ha))} ha`;
  if (ha >= 1) return `${ha.toFixed(1)} ha`;
  return `${ha.toFixed(2)} ha`;
}

/** Percentage with decimals for small values (so 0.5% isn't shown as "0%"). */
export function formatPct(p: number): string {
  if (p <= 0) return "0%";
  if (p < 0.1) return "<0,1%";
  if (p < 10) return `${p.toFixed(1).replace(".", ",")}%`;
  return `${Math.round(p)}%`;
}

/** Single coordinate value, 6 decimals, pt-BR (comma). */
export function coord6(n: number): string {
  return _fmtCoord6.format(n);
}
