"use client";

import { useEffect, useRef, useState } from "react";
import { FaMap, FaCheck } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { BASEMAPS, getBasemap } from "@/croqui/config/basemaps";

export function BasemapSwitcher() {
  const basemapId = useStore((s) => s.basemapId);
  const setBasemap = useStore((s) => s.setBasemap);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const t = setTimeout(
      () => document.addEventListener("mousedown", onDoc),
      0,
    );

    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open]);

  const current = getBasemap(basemapId);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: 40,
        left: 12,
        zIndex: 5,
        fontFamily: theme.font.ui,
      }}
    >
      {open && (
        <div
          className="fade-in"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: 0,
            minWidth: 180,
            background: theme.colors.panel,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.lg,
            overflow: "hidden",
          }}
        >
          {BASEMAPS.map((b) => {
            const active = b.id === basemapId;

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBasemap(b.id);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  width: "100%",
                  padding: "9px 12px",
                  border: "none",
                  borderBottom: `1px solid ${theme.colors.border}`,
                  background: active ? theme.colors.panelMuted : "transparent",
                  color: theme.colors.text,
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 400,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: theme.font.ui,
                }}
              >
                {b.name}
                {active && <FaCheck size={10} color={theme.colors.sage} />}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="ui-press"
        title="Trocar mapa base"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: theme.colors.panel,
          color: theme.colors.text,
          border: `1px solid ${open ? theme.colors.sageDark : theme.colors.border}`,
          borderRadius: theme.radius.md,
          boxShadow: theme.shadow.md,
          fontSize: 12.5,
          fontWeight: 500,
          fontFamily: theme.font.ui,
          cursor: "pointer",
          maxWidth: 200,
        }}
      >
        <FaMap size={12} color={theme.colors.sageDark} />
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {current.name}
        </span>
      </button>
    </div>
  );
}
