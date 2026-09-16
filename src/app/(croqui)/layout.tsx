import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croqui | Observatório da Caatinga",
  description: "Observatório Croqui",
};

export default function CroquiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
