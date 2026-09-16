"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { VECTOR_LAYERS, OVERLAY_LAYERS } from "@/croqui/config/layers";

const MUN = VECTOR_LAYERS[0];

export function FloatingLegend() {
  const [collapsed, setCollapsed] = useState(false);
  const visibility = useStore((s) => s.layerVisibility);
  const hasDrawn = useStore((s) => s.drawnFeatures.length > 0);

  const munVisible = visibility[MUN.id] !== false;
  const visibleOverlays = OVERLAY_LAYERS.filter((l) => visibility[l.id]);

  // Hide legend completely if there's literally nothing to show
  if (!munVisible && !hasDrawn && visibleOverlays.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 12,
        zIndex: 4,
        background: theme.colors.panel,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.md,
        fontFamily: theme.font.ui,
        minWidth: 200,
        maxWidth: 240,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="ui-press"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "8px 12px",
          background: theme.colors.panelMuted,
          border: "none",
          borderBottom: collapsed ? "none" : `1px solid ${theme.colors.border}`,
          color: theme.colors.sageDark,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.6,
          fontFamily: theme.font.ui,
          cursor: "pointer",
        }}
      >
        Legenda
        {collapsed ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
      </button>

      {!collapsed && (
        <div
          style={{
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {munVisible && (
            <LegendItem
              swatch={
                <FillBox
                  color={theme.colors.priorityRed}
                  border={theme.colors.priorityRed}
                />
              }
              label="Alta Prioridade (C5)"
              sub="249 municípios"
            />
          )}

          {visibleOverlays.map((l) => (
            <LegendItem
              key={l.id}
              swatch={<FillBox color={l.color} border={l.color} />}
              label={l.shortName || l.name}
            />
          ))}

          {hasDrawn && (
            <LegendItem
              swatch={
                <FillBox
                  color={theme.colors.drawnYellow}
                  border={theme.colors.drawnYellowDark}
                />
              }
              label="Área desenhada"
            />
          )}
        </div>
      )}
    </div>
  );
}

function LegendItem({
  swatch,
  label,
  sub,
}: {
  swatch: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {swatch}
      <div
        style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}
      >
        <span
          style={{ fontSize: 12, color: theme.colors.text, fontWeight: 500 }}
        >
          {label}
        </span>
        {sub && (
          <span style={{ fontSize: 10, color: theme.colors.textMuted }}>
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

function FillBox({ color, border }: { color: string; border: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 16,
        height: 12,
        background: `${color}55`, // ~33% opacity hex
        border: `1.5px solid ${border}`,
        borderRadius: 2,
        flexShrink: 0,
      }}
    />
  );
}
