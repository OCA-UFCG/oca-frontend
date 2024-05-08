import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/app/globalStyles";
import ThemeBody from "./ThemeBody";

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const lato = Lato({ weight: "400", subsets: ["latin"] });

console.log("NEXT_PUBLIC_GA_ID", NEXT_PUBLIC_GA_ID);

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

      <ThemeBody className={lato.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </ThemeBody>

      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
