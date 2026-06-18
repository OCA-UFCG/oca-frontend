import type { Metadata } from "next";

const CROQUI_URL = "https://observatorio-croqui.oca-portal.com";

export const metadata: Metadata = {
  title: "Croqui | Observatório da Caatinga",
  description: "Observatório Croqui",
};

export default function CroquiPage() {
  return (
    <iframe
      src={CROQUI_URL}
      title="Observatório Croqui"
      style={{ border: "none", width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
