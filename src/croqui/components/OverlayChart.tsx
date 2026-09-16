"use client";

// Distribuição por UF — barras horizontais em HTML puro (sem recharts), pra não
// depender de medição de container (que gerava o aviso width(-1)) nem da lib.

import { theme } from "@/croqui/config/theme";
import { formatPct } from "@/croqui/lib/format";
import type { MunicipioOverlay } from "@/croqui/types";

interface OverlayChartProps {
  overlay: MunicipioOverlay[];
}

// Distinct (but on-brand) colors for UFs hit by the polygon.
const UF_COLORS: Record<string, string> = {
  Bahia: "#7d8c5e",
  Paraíba: "#a8b393",
  "Rio Grande do Norte": "#c4a880",
  Ceará: "#a08560",
  Piauí: "#5a6843",
  Pernambuco: "#e0cba8",
  Alagoas: "#3d6b7d",
  Sergipe: "#b04a3a",
  "Minas Gerais": "#6b6b62",
};

export function OverlayChart({ overlay }: OverlayChartProps) {
  const byUf = new Map<string, number>();
  for (const m of overlay) {
    byUf.set(m.NM_UF, (byUf.get(m.NM_UF) ?? 0) + m.pctOfDrawn);
  }
  const data = Array.from(byUf, ([uf, pct]) => ({ uf, pct })).sort(
    (a, b) => b.pct - a.pct,
  );
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.pct), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {data.map((d) => (
        <div
          key={d.uf}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
          }}
        >
          <span
            style={{
              width: 92,
              flexShrink: 0,
              color: theme.colors.textMuted,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={d.uf}
          >
            {d.uf}
          </span>
          <div
            style={{
              flex: 1,
              height: 12,
              background: theme.colors.panelMuted,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(d.pct / max) * 100}%`,
                height: "100%",
                background: UF_COLORS[d.uf] ?? theme.colors.sand,
                borderRadius: 3,
              }}
            />
          </div>
          <span
            style={{
              width: 48,
              textAlign: "right",
              flexShrink: 0,
              fontFamily: theme.font.mono,
              color: theme.colors.textMuted,
            }}
          >
            {formatPct(d.pct)}
          </span>
        </div>
      ))}
    </div>
  );
}
