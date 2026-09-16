// O app é inteiramente client-side (o MapLibre precisa de `window`), então
// importamos dinamicamente com SSR desligado para evitar erro de hidratação.

"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/croqui/components/App"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        // `absolute` (e não `fixed`) para o placeholder ficar contido abaixo
        // dos dois headers, no mesmo espaço que o App vai ocupar.
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "#fafaf7",
        color: "#6b6b62",
        fontFamily: "var(--croqui-font-sans), system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      Carregando mapa…
    </div>
  ),
});

export default function CroquiPage() {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <App />
    </div>
  );
}
