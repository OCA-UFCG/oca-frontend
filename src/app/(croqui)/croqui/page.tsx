const CROQUI_URL = "https://observatorio-croqui.oca-portal.com";

export default function CroquiPage() {
  return (
    <iframe
      src={CROQUI_URL}
      title="Observatório Croqui"
      style={{
        border: "none",
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}
