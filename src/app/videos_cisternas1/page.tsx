import type { Metadata } from "next";

import Template from "@/templates/hubTemplate";

const VIDEO_URL =
  "https://drive.google.com/file/d/1mUwttc_G7GYDr9tIEncUx52onFgbSp2A/preview";

export const metadata: Metadata = {
  title: "Cisternas | Observatório da Caatinga",
  description: "Vídeo Cisternas",
};

export default function VideoCisternas1Page() {
  return (
    <Template>
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "40px auto",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={VIDEO_URL}
            title="Vídeo Cisternas"
            allow="autoplay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    </Template>
  );
}
