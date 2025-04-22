"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [sheet] = React.useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();

    return <>{styles}</>;
  });

  // If on client, render children without sheet
  if (typeof window !== "undefined") return <>{children}</>;

  // Otherwise, collect styles on server
  return (
    <StyleSheetManager sheet={sheet.instance} enableVendorPrefixes>
      {children}
    </StyleSheetManager>
  );
}
