"use client";

import { useEffect, useRef, useState } from "react";
import type { MunicipiosCollection } from "@/croqui/types";
import { MUNICIPIOS_C5_URL } from "@/croqui/config/map";
import { theme } from "@/croqui/config/theme";
import { Header } from "./Header";
import { MapView } from "./MapView";
import { StatsPanel } from "./StatsPanel";
import { useStore } from "@/croqui/lib/store";
import { computePolygonResults, type OverlayLayerInput } from "@/croqui/lib/computeStats";
import { queryCarOverlay } from "@/croqui/lib/carWfs";
import { STATIC_OVERLAY_LAYERS, WFS_OVERLAY_LAYERS } from "@/croqui/config/layers";

export default function App() {
  const [municipios, setMunicipios] = useState<MunicipiosCollection | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const drawnFeatures = useStore((s) => s.drawnFeatures);
  const overlayData = useStore((s) => s.overlayData);
  const setOverlayData = useStore((s) => s.setOverlayData);
  const setResults = useStore((s) => s.setResults);
  const updateResults = useStore((s) => s.updateResults);
  const setResultsLoading = useStore((s) => s.setResultsLoading);
  const lastDrawnKey = useRef<string>("");
  const carReqId = useRef(0);
  const carAbort = useRef<AbortController | null>(null);

  // ─── Load municipios GeoJSON once ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch(MUNICIPIOS_C5_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: MunicipiosCollection) => {
        if (!cancelled) setMunicipios(data);
      })
      .catch((err) => {
        if (!cancelled) setFetchError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Load the static thematic overlay GeoJSONs once (shared map + stats) ──
  useEffect(() => {
    let cancelled = false;
    for (const l of STATIC_OVERLAY_LAYERS) {
      fetch(l.url)
        .then((r) => (r.ok ? r.json() : null))
        .then((fc) => {
          if (!cancelled && fc) setOverlayData(l.id, fc);
        })
        .catch(() => {
          /* missing/optional overlay — layer just stays empty */
        });
    }
    return () => {
      cancelled = true;
    };
  }, [setOverlayData]);

  // ─── Recompute stats when the drawing (or loaded overlays) change ─────────
  // Synchronous part: geometry + C5 municipality overlay + static layers.
  // Async part: CAR (imóveis rurais) is fetched live from the GeoServer.
  useEffect(() => {
    if (drawnFeatures.length === 0) {
      setResults(null);
      lastDrawnKey.current = "";
      carReqId.current++;
      carAbort.current?.abort();
      return;
    }
    if (!municipios) return;

    const overlayKeys = Object.keys(overlayData).sort().join(",");
    const key =
      JSON.stringify(drawnFeatures.map((f) => f.geometry.coordinates)) + "|" + overlayKeys;
    if (key === lastDrawnKey.current) return;
    lastDrawnKey.current = key;

    setResultsLoading(true);
    const staticInputs: OverlayLayerInput[] = STATIC_OVERLAY_LAYERS.filter(
      (l) => overlayData[l.id]
    ).map((l) => ({
      layerId: l.id,
      layerName: l.shortName || l.name,
      color: l.color,
      nameProp: l.nameProp,
      features: overlayData[l.id].features,
    }));
    const base = computePolygonResults(drawnFeatures, municipios.features, staticInputs);

    // CAR (WFS) — only when the drawing is inside the study area (we need a UF).
    const car = WFS_OVERLAY_LAYERS[0];
    if (car && base.municipios.length > 0) {
      base.layers.push({
        layerId: car.id,
        layerName: car.shortName || car.name,
        color: car.color,
        kind: "polygon",
        featureCount: 0,
        areaHa: 0,
        pctOfDrawn: 0,
        items: [],
        loading: true,
      });
    }
    setResults(base);
    setResultsLoading(false);

    if (car && base.municipios.length > 0) {
      carAbort.current?.abort();
      const ctrl = new AbortController();
      carAbort.current = ctrl;
      const reqId = ++carReqId.current;
      queryCarOverlay(
        drawnFeatures,
        base.municipios,
        {
          layerId: car.id,
          layerName: car.shortName || car.name,
          color: car.color,
          nameProp: car.nameProp,
          wfsUrl: car.wfsUrl!,
          wfsTypePrefix: car.wfsTypePrefix!,
          maxFeatures: car.maxFeatures,
        },
        ctrl.signal
      )
        .then((layer) => {
          if (reqId !== carReqId.current) return;
          const cur = useStore.getState().results;
          if (!cur) return;
          updateResults({
            layers: cur.layers.map((l) => (l.layerId === car.id ? layer : l)),
          });
        })
        .catch((err: Error) => {
          if (reqId !== carReqId.current || err.name === "AbortError") return;
          const cur = useStore.getState().results;
          if (!cur) return;
          updateResults({
            layers: cur.layers.map((l) =>
              l.layerId === car.id
                ? { ...l, loading: false, error: "GeoServer indisponível" }
                : l
            ),
          });
        });
    }
  }, [drawnFeatures, municipios, overlayData, setResults, updateResults, setResultsLoading]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: theme.colors.bg,
      }}
    >
      <Header />

      <main style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <div
          id="croqui-map-region"
          style={{ flex: 1, position: "relative", minWidth: 0 }}
        >
          {fetchError ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                color: theme.colors.danger,
                background: theme.colors.bg,
                padding: 24,
                textAlign: "center",
              }}
            >
              Erro ao carregar municípios: {fetchError}
            </div>
          ) : (
            <MapView municipios={municipios} />
          )}
        </div>
        <StatsPanel />
      </main>
    </div>
  );
}
