"use client";

import Image from "next/image";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import { CroquiButton } from "./CroquiButton";

export function Header() {
  const hasDrawn = useStore((s) => s.drawnFeatures.length > 0);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: theme.colors.panel,
        borderBottom: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadow.sm,
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Image
          src="/logo-observatorio.png"
          alt="Observatório da Caatinga e Desertificação"
          width={56}
          height={56}
          style={{ height: 48, width: "auto", objectFit: "contain" }}
          priority
        />
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              color: theme.colors.textMuted,
              fontWeight: 500,
            }}
          >
            Observatório da Caatinga e Desertificação
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.sageDark,
            }}
          >
            Gerador de Croquis
          </h1>
        </div>
      </div>

      <CroquiButton enabled={hasDrawn} />
    </header>
  );
}
