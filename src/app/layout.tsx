import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/app/globalStyles";
import ThemeBody from "./ThemeBody";
import { ContentProvider } from "@/contexts/ContentProvider";

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

      <ThemeBody className={lato.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ContentProvider>{children}</ContentProvider>
        </StyledComponentsRegistry>
      </ThemeBody>

      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
