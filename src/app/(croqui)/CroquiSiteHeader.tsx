"use client";

import { ThemeProvider, createGlobalStyle } from "styled-components";

import StyledComponentsRegistry from "@/lib/registry";
import { theme } from "@/app/theme";
import HeaderSection from "@/components/Header/Section/HeaderSection";

// O GlobalStyles do site NÃO entra neste grupo: o reset dele traz
// `details { display: none }`, que esconderia as seções recolhíveis do
// StatsPanel do croqui. A árvore do Header depende de uma única regra desse
// reset — a padding zerada do <ul> do NavList — então repomos só ela, escopada
// por classe para não alcançar a subárvore do croqui.
const OcaHeaderScope = createGlobalStyle`
  .oca-header-scope ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export function CroquiSiteHeader() {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <OcaHeaderScope />
        <div className="oca-header-scope">
          <HeaderSection />
        </div>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
