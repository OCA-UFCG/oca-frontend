"use client";
import { ThemeProvider } from 'styled-components';
import { PropsWithChildren, ReactElement } from "react";
import { theme } from './theme';

const ThemeBody = ({children, className}: PropsWithChildren<{className: string}>): ReactElement => {
  
  return (
    <body className={className}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </body>
  );
};

export default ThemeBody;