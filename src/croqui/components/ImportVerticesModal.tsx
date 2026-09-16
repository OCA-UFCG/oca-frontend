"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes, FaFileUpload, FaDrawPolygon } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { parseVerticesInput } from "@/croqui/lib/parseVertices";

interface ImportVerticesModalProps {
  open: boolean;
  onClose: () => void;
}

const PLACEHOLDER = `Uma coordenada por linha (lat, lon).
Deixe uma LINHA EM BRANCO entre polígonos:

-7.36, -35.30
-7.36, -35.25
-7.42, -35.25

-8.10, -37.20
-8.10, -37.10
-8.18, -37.15

Ou cole/importe um GeoJSON (Polygon, MultiPolygon ou vários features).`;

export function ImportVerticesModal({ open, onClose }: ImportVerticesModalProps) {
  const setPendingImport = useStore((s) => s.setPendingImport);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const reset = () => {
    setText("");
    setError(null);
    setFileName(null);
  };

  const onFile = async (file: File) => {
    const content = await file.text();
    setText(content);
    setFileName(file.name);
    setError(null);
  };

  const onSubmit = () => {
    try {
      const features = parseVerticesInput(text);
      setPendingImport(features);
      reset();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Rendered through a portal into <body>: the DrawToolbar (this modal's React
  // parent) has a CSS transform, which would otherwise make `position: fixed`
  // resolve against the toolbar instead of the viewport — pinning the modal to
  // the bottom. The portal escapes that transformed containing block.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(40,40,30,0.35)",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
        fontFamily: theme.font.ui,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="fade-in"
        style={{
          width: 440,
          maxWidth: "92vw",
          background: theme.colors.panel,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadow.lg,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: `1px solid ${theme.colors.border}`,
            background: theme.colors.panelMuted,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 600,
              color: theme.colors.sageDark,
            }}
          >
            Importar vértices
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ui-press"
            aria-label="Fechar"
            style={{ background: "none", border: "none", color: theme.colors.textMuted, cursor: "pointer", padding: 4 }}
          >
            <FaTimes size={14} />
          </button>
        </header>

        <div style={{ padding: 18 }}>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            style={{
              width: "100%",
              height: 160,
              resize: "vertical",
              padding: "10px 12px",
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              fontSize: 12.5,
              fontFamily: theme.font.mono,
              color: theme.colors.text,
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="ui-press"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 12px",
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                background: theme.colors.panel,
                color: theme.colors.text,
                fontSize: 12.5,
                fontFamily: theme.font.ui,
                cursor: "pointer",
              }}
            >
              <FaFileUpload size={12} />
              Carregar arquivo
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".geojson,.json,.csv,.txt"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
                e.target.value = ""; // allow re-selecting same file
              }}
              style={{ display: "none" }}
            />
            {fileName && (
              <span style={{ fontSize: 11.5, color: theme.colors.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {fileName}
              </span>
            )}
          </div>

          <p style={{ margin: "12px 0 0", fontSize: 11, color: theme.colors.textFaint, lineHeight: 1.5 }}>
            Texto/CSV: uma coordenada por linha em <strong>lat, lon</strong>;
            uma <strong>linha em branco</strong> separa cada polígono. GeoJSON
            (Polygon/MultiPolygon/vários features) também vale. A importação
            <strong> soma</strong> ao que já está desenhado.
          </p>

          {error && (
            <p style={{ margin: "10px 0 0", fontSize: 12, color: theme.colors.danger }}>
              {error}
            </p>
          )}
        </div>

        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "12px 18px",
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="ui-press"
            style={{
              padding: "9px 14px",
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              background: theme.colors.panel,
              color: theme.colors.textMuted,
              fontSize: 13,
              fontFamily: theme.font.ui,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!text.trim()}
            className="ui-press"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 16px",
              border: "none",
              borderRadius: theme.radius.md,
              background: text.trim() ? theme.colors.sage : theme.colors.borderStrong,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: theme.font.ui,
              cursor: text.trim() ? "pointer" : "not-allowed",
            }}
          >
            <FaDrawPolygon size={12} />
            Desenhar
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
