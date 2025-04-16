"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const Providers = (props: React.PropsWithChildren) => {
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          {props.children}
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
