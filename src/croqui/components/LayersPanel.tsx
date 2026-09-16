"use client";

import { useEffect, useRef } from "react";
import { FaLayerGroup, FaTimes, FaCircleNotch, FaExclamationTriangle } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { VECTOR_LAYERS, RASTER_LAYERS } from "@/croqui/config/layers";

export function LayersPanel() {
  const open = useStore((s) => s.layersPanelOpen);
  const toggleOpen = useStore((s) => s.toggleLayersPanel);
  const setOpen = useStore((s) => s.setLayersPanelOpen);

  const visibility = useStore((s) => s.layerVisibility);
  const opacity = useStore((s) => s.layerOpacity);
  const toggleLayer = useStore((s) => s.toggleLayer);
  const setOpacity = useStore((s) => s.setOpacity);
  const rasterLoading = useStore((s) => s.rasterLoading);
  const rasterError = useStore((s) => s.rasterError);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Defer so the click that opened the panel doesn't immediately close it.
    const t = setTimeout(() => document.addEventListener("mousedown", onDocClick), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        className="ui-press"
        title="Camadas do mapa"
        aria-label="Abrir painel de camadas"
        style={{
          // Sits next to the SearchBar (which is left:12, width:320 → right edge 332)
          position: "absolute",
          top: 12,
          left: 340,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          background: open ? theme.colors.sage : theme.colors.panel,
          color: open ? "#fff" : theme.colors.text,
          border: `1px solid ${open ? theme.colors.sageDark : theme.colors.border}`,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadow.md,
          fontFamily: theme.font.ui,
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <FaLayerGroup size={13} />
        Camadas
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fade-in"
          style={{
            position: "absolute",
            top: 56,
            left: 340,
            zIndex: 6,
            width: 340,
            background: theme.colors.panel,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadow.lg,
            overflow: "hidden",
            fontFamily: theme.font.ui,
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: `1px solid ${theme.colors.border}`,
              background: theme.colors.panelMuted,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 600,
                color: theme.colors.sageDark,
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              Camadas
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ui-press"
              style={{
                background: "transparent",
                border: "none",
                color: theme.colors.textMuted,
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Fechar"
            >
              <FaTimes size={13} />
            </button>
          </header>

          <div style={{ overflowY: "auto", padding: "10px 0" }}>
            <GroupHeader title="Vetorial" />
            {VECTOR_LAYERS.map((v) => (
              <LayerRow
                key={v.id}
                id={v.id}
                name={v.name}
                description={v.description}
                color={v.color}
                visible={visibility[v.id] ?? false}
                opacity={opacity[v.id] ?? 100}
                onToggle={() => toggleLayer(v.id)}
                onOpacity={(o) => setOpacity(v.id, o)}
                kind="vector"
              />
            ))}

            {RASTER_LAYERS.length > 0 && (
              <>
                <GroupHeader title="Raster" />
                {RASTER_LAYERS.map((r) => (
                  <LayerRow
                    key={r.id}
                    id={r.id}
                    name={r.name}
                    description={r.description}
                    color={r.classes[0].color}
                    gradient={r.classes.map((c) => c.color)}
                    visible={visibility[r.id] ?? false}
                    opacity={opacity[r.id] ?? 100}
                    onToggle={() => toggleLayer(r.id)}
                    onOpacity={(o) => setOpacity(r.id, o)}
                    kind="raster"
                    loading={!!rasterLoading[r.id]}
                    error={rasterError[r.id] ?? null}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        padding: "8px 16px 4px",
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        color: theme.colors.textFaint,
      }}
    >
      {title}
    </div>
  );
}

interface LayerRowProps {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient?: string[];
  visible: boolean;
  opacity: number;
  onToggle: () => void;
  onOpacity: (o: number) => void;
  kind: "vector" | "raster";
  loading?: boolean;
  error?: string | null;
}

function LayerRow({
  name,
  description,
  color,
  gradient,
  visible,
  opacity,
  onToggle,
  onOpacity,
  loading,
  error,
}: LayerRowProps) {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderBottom: `1px solid ${theme.colors.border}`,
        background: visible ? theme.colors.bg : theme.colors.panel,
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={visible}
          onChange={onToggle}
          style={{ marginTop: 4, accentColor: theme.colors.sage, width: 14, height: 14 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {gradient ? (
              <div
                style={{
                  width: 28,
                  height: 10,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${gradient.join(",")})`,
                  border: `1px solid ${theme.colors.border}`,
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: color,
                  flexShrink: 0,
                }}
              />
            )}
            <span style={{ fontSize: 13, fontWeight: 500, color: theme.colors.text }}>
              {name}
            </span>
            {loading && (
              <FaCircleNotch
                size={11}
                color={theme.colors.textMuted}
                style={{ animation: "spin 1s linear infinite", marginLeft: 4 }}
              />
            )}
          </div>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 11,
              color: theme.colors.textMuted,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
          {error && (
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 11,
                color: theme.colors.danger,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <FaExclamationTriangle size={10} />
              {error}
            </p>
          )}
          {visible && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 10, color: theme.colors.textFaint, width: 50 }}>
                Opacidade
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => onOpacity(Number(e.target.value))}
                style={{ flex: 1, accentColor: theme.colors.sage }}
                aria-label="Opacidade"
              />
              <span
                style={{
                  fontSize: 10,
                  color: theme.colors.textMuted,
                  fontFamily: theme.font.mono,
                  width: 30,
                  textAlign: "right",
                }}
              >
                {opacity}%
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
