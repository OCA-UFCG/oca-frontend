"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { OverlayChart } from "./OverlayChart";
import { formatHa, formatPct, coord6, MAX_DRAW_AREA_HA } from "@/croqui/lib/format";
import type { DrawnFeature, LayerOverlay } from "@/croqui/types";

const fmt = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});
const fmt0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const fmtCoord = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});

export function StatsPanel() {
  const drawnFeatures = useStore((s) => s.drawnFeatures);
  const results = useStore((s) => s.results);
  const loading = useStore((s) => s.resultsLoading);
  const hasDrawn = drawnFeatures.length > 0;

  if (!hasDrawn) {
    return (
      <aside
        style={{
          width: 320,
          flexShrink: 0,
          background: theme.colors.panel,
          borderLeft: `1px solid ${theme.colors.border}`,
          padding: "20px 18px",
          fontFamily: theme.font.ui,
          color: theme.colors.textMuted,
          fontSize: 13,
          overflowY: "auto",
        }}
      >
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            Desenhe um ou mais polígonos no mapa para ver área, perímetro,
            centroide, os municípios de alta prioridade (classe 5) cruzados e o
            cruzamento com as camadas temáticas.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      id="croqui-stats-region"
      style={{
        width: 360,
        flexShrink: 0,
        background: theme.colors.panel,
        borderLeft: `1px solid ${theme.colors.border}`,
        padding: "18px 18px 24px",
        fontFamily: theme.font.ui,
        color: theme.colors.text,
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          margin: "0 0 14px",
          fontSize: 14,
          fontWeight: 600,
          color: theme.colors.sageDark,
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        Resultados
      </h2>

      {loading || !results ? (
        <SkeletonStats />
      ) : (
        <>
          {results.invalidCount > 0 && (
            <ValidationWarning
              invalid={results.invalidCount}
              total={results.geometry.polygonCount}
            />
          )}

          {results.geometry.areaHa > MAX_DRAW_AREA_HA && (
            <WarnBox>
              A área total desenhada ({formatHa(results.geometry.areaHa)}) ultrapassa o
              limite de {MAX_DRAW_AREA_HA} ha.
            </WarnBox>
          )}

          <Section title="Geometria">
            <Row label="Área" value={formatHa(results.geometry.areaHa)} />
            {results.geometry.polygonCount > 1 && (
              <Row
                label="Polígonos"
                value={fmt0.format(results.geometry.polygonCount)}
              />
            )}
            <Row
              label="Perímetro"
              value={`${fmt.format(results.geometry.perimeterKm)} km`}
            />
            <Row
              label="Vértices"
              value={fmt0.format(results.geometry.vertexCount)}
            />
            <Row
              label="Centroide"
              value={`${fmtCoord.format(results.geometry.centroid[1])} S, ${fmtCoord.format(results.geometry.centroid[0])} W`}
              mono
            />
          </Section>

          <Section title={`Municípios cruzados (${results.municipios.length})`}>
            {results.municipios.length === 0 ? (
              <p
                style={{
                  fontSize: 12,
                  color: theme.colors.textMuted,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Nenhum polígono intersecta município de alta prioridade (C5).
              </p>
            ) : (
              <ul
                style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 12 }}
              >
                {results.municipios.slice(0, 12).map((m) => (
                  <li
                    key={m.CD_MUN}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 8,
                      padding: "5px 0",
                      borderBottom: `1px dashed ${theme.colors.border}`,
                    }}
                  >
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ fontWeight: 500 }}>{m.NM_MUN}</span>
                      <span style={{ color: theme.colors.textMuted }}> — {m.NM_UF}</span>
                    </span>
                    <span
                      style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.font.mono,
                        whiteSpace: "nowrap",
                        fontSize: 11,
                      }}
                    >
                      {formatHa(m.areaHa)} · {formatPct(m.pctOfDrawn)}
                    </span>
                  </li>
                ))}
                {results.municipios.length > 12 && (
                  <li
                    style={{
                      padding: "5px 0",
                      color: theme.colors.textMuted,
                      fontSize: 11,
                      fontStyle: "italic",
                    }}
                  >
                    +{results.municipios.length - 12} outros…
                  </li>
                )}
                {results.outsideAreaHa >= 0.1 && (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 8,
                      padding: "5px 0",
                      marginTop: 2,
                      borderTop: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <span
                      style={{
                        minWidth: 0,
                        flex: 1,
                        color: theme.colors.textMuted,
                        fontStyle: "italic",
                      }}
                    >
                      Fora dos municípios C5
                    </span>
                    <span
                      style={{
                        color: theme.colors.textMuted,
                        fontFamily: theme.font.mono,
                        whiteSpace: "nowrap",
                        fontSize: 11,
                      }}
                    >
                      {formatHa(results.outsideAreaHa)} · {formatPct(results.outsidePct)}
                    </span>
                  </li>
                )}
              </ul>
            )}
          </Section>

          {results.municipios.length > 0 && (
            <Section title="Distribuição por UF">
              <OverlayChart overlay={results.municipios} />
            </Section>
          )}

          {/* Thematic layer crossings (terras indígenas, quilombolas,
              assentamentos, imóveis rurais). Empty until their data is wired. */}
          {results.layers.map((layer) => (
            <LayerOverlaySection key={layer.layerId} layer={layer} />
          ))}

          <VertexSection features={drawnFeatures} />
        </>
      )}
    </aside>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        background: "#fdf1ee",
        border: `1px solid ${theme.colors.danger}`,
        borderRadius: theme.radius.md,
        padding: "10px 12px",
        marginBottom: 16,
      }}
    >
      <FaExclamationTriangle
        size={13}
        color={theme.colors.danger}
        style={{ marginTop: 2, flexShrink: 0 }}
      />
      <p style={{ margin: 0, fontSize: 12, color: theme.colors.danger, lineHeight: 1.45 }}>
        {children}
      </p>
    </div>
  );
}

function ValidationWarning({ invalid, total }: { invalid: number; total: number }) {
  const allOutside = invalid >= total;
  return (
    <WarnBox>
      {allOutside
        ? "Nenhum polígono desenhado está dentro de um município de alta prioridade (C5). Cada polígono precisa ter ao menos uma parte dentro da área de estudo."
        : `${invalid} de ${total} polígonos estão fora dos municípios C5. Cada polígono precisa ter ao menos uma parte dentro da área de estudo.`}
    </WarnBox>
  );
}

function LayerOverlaySection({ layer }: { layer: LayerOverlay }) {
  const isPolygon = layer.kind === "polygon";
  return (
    <Section
      title={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 2,
              background: layer.color,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {layer.layerName}
          {layer.loading ? "" : ` (${layer.featureCount})`}
        </span>
      }
    >
      {layer.loading ? (
        <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, fontStyle: "italic" }}>
          Consultando o GeoServer do CAR…
        </p>
      ) : layer.error ? (
        <p style={{ fontSize: 12, color: theme.colors.danger, margin: 0 }}>{layer.error}</p>
      ) : layer.featureCount === 0 ? (
        <p
          style={{
            fontSize: 12,
            color: theme.colors.textMuted,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Nenhum cruzamento com o polígono.
        </p>
      ) : (
        <>
          {isPolygon && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              <span style={{ color: theme.colors.textMuted }}>Área cruzada</span>
              <span style={{ fontWeight: 500, fontFamily: theme.font.mono, fontSize: 11.5 }}>
                {formatHa(layer.areaHa)} · {formatPct(layer.pctOfDrawn)}
              </span>
            </div>
          )}
          {layer.items.length > 0 && (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 12 }}>
            {layer.items.map((it, i) => (
              <li
                key={`${it.name}-${i}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 8,
                  padding: "5px 0",
                  borderBottom: `1px dashed ${theme.colors.border}`,
                }}
              >
                <span style={{ minWidth: 0, flex: 1, fontWeight: 500 }}>{it.name}</span>
                {isPolygon && (
                  <span
                    style={{
                      color: theme.colors.textMuted,
                      fontFamily: theme.font.mono,
                      whiteSpace: "nowrap",
                      fontSize: 11,
                    }}
                  >
                    {formatHa(it.areaHa)} · {formatPct(it.pctOfDrawn)}
                  </span>
                )}
              </li>
            ))}
            {layer.featureCount > layer.items.length && (
              <li
                style={{
                  padding: "5px 0",
                  color: theme.colors.textMuted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                +{layer.featureCount - layer.items.length} outros…
              </li>
            )}
          </ul>
          )}
          {layer.note && (
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 10.5,
                color: theme.colors.textFaint,
                fontStyle: "italic",
              }}
            >
              {layer.note}
            </p>
          )}
        </>
      )}
    </Section>
  );
}

const vth: React.CSSProperties = {
  textAlign: "left",
  color: theme.colors.textMuted,
  fontWeight: 600,
  padding: "3px 6px",
  borderBottom: `1px solid ${theme.colors.border}`,
};
const vtd: React.CSSProperties = {
  padding: "2px 6px",
  borderBottom: `1px dashed ${theme.colors.border}`,
  color: theme.colors.text,
};

function VertexSection({ features }: { features: DrawnFeature[] }) {
  if (features.length === 0) return null;
  return (
    <Section title="Vértices">
      {features.map((f, i) => {
        const ring = f.geometry.coordinates[0] ?? [];
        const closed =
          ring.length > 1 &&
          ring[0][0] === ring[ring.length - 1][0] &&
          ring[0][1] === ring[ring.length - 1][1];
        const pts = closed ? ring.slice(0, -1) : ring;
        return (
          <details key={i} open style={{ marginBottom: 8 }}>
            <summary
              style={{
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 500,
                color: theme.colors.text,
                padding: "2px 0",
              }}
            >
              {features.length > 1 ? `Polígono ${i + 1} · ` : ""}
              {pts.length} vértices
            </summary>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 11,
                fontFamily: theme.font.mono,
                marginTop: 4,
              }}
            >
              <thead>
                <tr>
                  <th style={vth}>#</th>
                  <th style={{ ...vth, textAlign: "right" }}>Lat</th>
                  <th style={{ ...vth, textAlign: "right" }}>Lon</th>
                </tr>
              </thead>
              <tbody>
                {pts.map((p, j) => (
                  <tr key={j}>
                    <td style={vtd}>{j + 1}</td>
                    <td style={{ ...vtd, textAlign: "right" }}>{coord6(p[1])}</td>
                    <td style={{ ...vtd, textAlign: "right" }}>{coord6(p[0])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        );
      })}
    </Section>
  );
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 18 }}>
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: 11,
          fontWeight: 600,
          color: theme.colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "5px 0",
        borderBottom: `1px solid ${theme.colors.border}`,
        fontSize: 13,
      }}
    >
      <span style={{ color: theme.colors.textMuted }}>{label}</span>
      <span
        style={{
          fontWeight: 500,
          fontFamily: mono ? theme.font.mono : theme.font.ui,
          fontSize: mono ? 11 : 13,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SkeletonStats() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[120, 80, 60, 100, 90, 70].map((w, i) => (
        <div key={i} className="skeleton" style={{ height: 14, width: `${w}%` }} />
      ))}
    </div>
  );
}
