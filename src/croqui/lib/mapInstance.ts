// Module-level singleton holding the active MapLibre map instance.
// Lets non-React code (the PNG exporter) reach into the map without
// having to thread refs through the component tree.

import type { Map as MaplibreMap } from "maplibre-gl";

let _map: MaplibreMap | null = null;

export function setMapInstance(m: MaplibreMap | null): void {
  _map = m;
  // Dev-only: expose for debugging / e2e checks in the browser console.
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { __map?: MaplibreMap | null }).__map = m;
  }
}

export function getMapInstance(): MaplibreMap | null {
  return _map;
}

/**
 * Force a fresh render and synchronously copy the WebGL canvas pixels into a
 * 2D canvas. Works even when `preserveDrawingBuffer` is false — by reading
 * inside the `render` callback we catch the buffer before the browser clears it.
 */
export function captureMapToCanvas(): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const map = _map;
    if (!map) {
      reject(new Error("Map instance not registered"));
      return;
    }
    const onRender = () => {
      map.off("render", onRender);
      try {
        const src = map.getCanvas();
        const out = document.createElement("canvas");
        out.width = src.width;
        out.height = src.height;
        const ctx = out.getContext("2d");
        if (!ctx) {
          reject(new Error("2D context unavailable"));
          return;
        }
        // Synchronous read inside the render frame — buffer is still valid.
        ctx.drawImage(src, 0, 0);
        resolve(out);
      } catch (err) {
        reject(err as Error);
      }
    };
    map.on("render", onRender);
    map.triggerRepaint();
  });
}
