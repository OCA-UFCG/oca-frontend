"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {props.children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
