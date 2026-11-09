import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "../Providers";

const inter = Inter({ subsets: ["latin"] });

// Prévia do redesign em /preview, protegida por senha (src/middleware.ts).
// Sem Google Analytics para não misturar a revisão com o tráfego real.
export const metadata: Metadata = {
  title: "Observatório da Caatinga (prévia)",
  description: "Observatório da Caatinga",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
