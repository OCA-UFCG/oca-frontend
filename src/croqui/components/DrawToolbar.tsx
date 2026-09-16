"use client";

import { useState } from "react";
import { FaDrawPolygon, FaTrash, FaFileImport } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { ImportVerticesModal } from "./ImportVerticesModal";

export function DrawToolbar() {
  const drawMode = useStore((s) => s.drawMode);
  const setDrawMode = useStore((s) => s.setDrawMode);
  const hasDrawn = useStore((s) => s.drawnFeatures.length > 0);
  const clearDrawing = useStore((s) => s.clearDrawing);
  const [importOpen, setImportOpen] = useState(false);

  const isDrawing = drawMode === "polygon";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 6,
        background: theme.colors.panel,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        padding: 6,
        boxShadow: theme.shadow.md,
        zIndex: 5,
      }}
    >
      <button
        type="button"
        onClick={() => setDrawMode(isDrawing ? "idle" : "polygon")}
        className="ui-press"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          border: "none",
          borderRadius: theme.radius.md,
          background: isDrawing ? theme.colors.sage : "transparent",
          color: isDrawing ? "#fff" : theme.colors.text,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: theme.font.ui,
        }}
        title={isDrawing ? "Cancelar desenho" : "Desenhar polígono"}
      >
        <FaDrawPolygon size={13} />
        {isDrawing ? "Desenhando…" : "Desenhar polígono"}
      </button>

      <button
        type="button"
        onClick={clearDrawing}
        disabled={!hasDrawn && !isDrawing}
        className="ui-press"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          border: "none",
          borderRadius: theme.radius.md,
          background: "transparent",
          color: hasDrawn || isDrawing ? theme.colors.danger : theme.colors.textFaint,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: theme.font.ui,
          cursor: hasDrawn || isDrawing ? "pointer" : "not-allowed",
        }}
        title="Limpar"
      >
        <FaTrash size={11} />
        Limpar
      </button>

      <div style={{ width: 1, alignSelf: "stretch", background: theme.colors.border, margin: "2px 2px" }} />

      <button
        type="button"
        onClick={() => setImportOpen(true)}
        className="ui-press"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "8px 12px",
          border: "none",
          borderRadius: theme.radius.md,
          background: "transparent",
          color: theme.colors.text,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: theme.font.ui,
        }}
        title="Importar vértices (texto ou GeoJSON)"
      >
        <FaFileImport size={12} />
        Importar
      </button>

      <ImportVerticesModal open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
