import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "@/croqui/croqui.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

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
      <body>{children}</body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
    </html>
  );
}
