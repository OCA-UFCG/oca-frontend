import type { Metadata } from "next";
import { Lato } from "next/font/google";

import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/app/globalStyles";
import ThemeBody from "./ThemeBody";

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

      <ThemeBody className={lato.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </ThemeBody>
    </html>
  );
}
