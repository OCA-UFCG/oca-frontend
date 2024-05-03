import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from "@/app/globalStyles";
import ThemeBody from "./ThemeBody";


const inter = Inter({ subsets: ["latin"] });

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

      <ThemeBody className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </ThemeBody>
    </html>
  );
}
