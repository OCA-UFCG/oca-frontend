import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";

import "@/croqui/croqui.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import { CroquiSiteHeader } from "./CroquiSiteHeader";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--croqui-font-sans",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--croqui-font-mono",
});

export const metadata: Metadata = {
  title: "Croqui | Observatório da Caatinga",
  description: "Observatório Croqui",
};

export default function CroquiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        {/* Coluna: Header do OCA com altura natural, croqui ocupando o resto.
            O `min-height: 0` é necessário para o filho flex poder encolher e
            deixar o StatsPanel rolar em vez de estourar a viewport. */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <CroquiSiteHeader />
          <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
