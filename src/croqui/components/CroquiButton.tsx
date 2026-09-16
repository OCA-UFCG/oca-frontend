"use client";

import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { theme } from "@/croqui/config/theme";
import { ExportModal } from "./ExportModal";

interface CroquiButtonProps {
  enabled: boolean;
}

export function CroquiButton({ enabled }: CroquiButtonProps) {
  const [open, setOpen] = useState(false);
  const disabled = !enabled;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="ui-press"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          border: "none",
          borderRadius: theme.radius.md,
          background: disabled ? theme.colors.borderStrong : theme.colors.sage,
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          fontFamily: theme.font.ui,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : theme.shadow.sm,
        }}
        title={
          !enabled
            ? "Desenhe um polígono para habilitar a exportação"
            : "Exportar relatório (PDF)"
        }
      >
        <FaFilePdf size={13} />
        Exportar relatório
      </button>

      <ExportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
