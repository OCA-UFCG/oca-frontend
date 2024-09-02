import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Providers } from "./Providers";

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Observatório da Caatinga",
  description: "Observatório da Caatinga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={lato.className}>
        <Providers>{children}</Providers>
      </body>

      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
