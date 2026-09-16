"use client";

import { useEffect, useRef } from "react";
import maplibregl, {
  type Map as MaplibreMap,
  type MapMouseEvent,
} from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import bbox from "@turf/bbox";

import { BLANK_STYLE, MAP_INIT, MUNICIPIOS_META } from "@/croqui/config/map";
import { getBasemap } from "@/croqui/config/basemaps";
import { theme } from "@/croqui/config/theme";
import { useStore } from "@/croqui/lib/store";
import type { DrawnFeature, MunicipiosCollection } from "@/croqui/types";
import {
  OVERLAY_LAYERS,
  STATIC_OVERLAY_LAYERS,
  WFS_OVERLAY_LAYERS,
} from "@/croqui/config/layers";
import { fetchCarFeatures, ufsFromNames } from "@/croqui/lib/carWfs";
import { setMapInstance } from "@/croqui/lib/mapInstance";
import { SearchBar } from "./SearchBar";
import { DrawToolbar } from "./DrawToolbar";
import { LayersPanel } from "./LayersPanel";
import { FloatingLegend } from "./FloatingLegend";
import { BasemapSwitcher } from "./BasemapSwitcher";

// ─── MapLibre / mapbox-gl-draw compat shim ──────────────────────────────────
// MapboxDraw was built for mapbox-gl-js classnames; MapLibre renames them.
// Patch the constants once at module load so Draw can find its controls.
const DrawConstants = (
  MapboxDraw as unknown as {
    constants: { classes: Record<string, string> };
  }
).constants;
DrawConstants.classes.CANVAS = "maplibregl-canvas";
DrawConstants.classes.CONTROL_BASE = "maplibregl-ctrl";
DrawConstants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
DrawConstants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";
DrawConstants.classes.ATTRIBUTION = "maplibregl-ctrl-attrib";

const MUN_LAYER_ID = "municipios-c5"; // matches config/layers.ts id
const MUN_SOURCE_ID = "municipios-c5";
const MUN_FILL_LAYER = "municipios-c5-fill";
const MUN_OUTLINE_LAYER = "municipios-c5-outline";
const MUN_HIGHLIGHT_LAYER = "municipios-c5-highlight";

const BASEMAP_SOURCE_ID = "basemap";
const BASEMAP_LAYER_ID = "basemap-raster";

// Overlay (thematic) layer id helpers + the single live CAR layer config.
const ovSrc = (id: string) => `ov-${id}`;
const ovFill = (id: string) => `ov-${id}-fill`;
const ovLine = (id: string) => `ov-${id}-line`;
const CAR = WFS_OVERLAY_LAYERS[0];

/** First mapbox-gl-draw layer id, so overlays insert *below* the drawing. */
function drawBeforeId(map: MaplibreMap): string | undefined {
  return map.getStyle().layers.find((l) => l.id.startsWith("gl-draw"))?.id;
}

/** Axis-aligned bbox overlap test ([minx,miny,maxx,maxy]). */
function boxesOverlap(
  a: [number, number, number, number],
  b: [number, number, number, number],
): boolean {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

/**
 * Run `cb` as soon as the map can accept addSource/addLayer — i.e. once
 * `isStyleLoaded()` is true. Polls instead of relying on a single event:
 *   - `once("load")` never re-fires if load already happened (toggling a layer
 *     after the map loaded would hang).
 *   - the last `styledata` can fire *before* `isStyleLoaded()` flips true.
 *   - `idle` may never fire if the map is wedged (e.g. transform stuck at 0×0).
 * Polling sidesteps all three. Gives up silently after ~15 s.
 */
function whenStyleReady(map: MaplibreMap, cb: () => void): void {
  // Bail if the map was destroyed (e.g. HMR/unmount) — otherwise the poll would
  // keep calling into a removed map and MapLibre logs "There is no style…".
  const removed = () =>
    (map as unknown as { _removed?: boolean })._removed === true;
  if (removed()) return;
  if (map.isStyleLoaded()) {
    cb();

    return;
  }
  let tries = 0;
  const id = window.setInterval(() => {
    if (removed()) {
      window.clearInterval(id);
    } else if (map.isStyleLoaded()) {
      window.clearInterval(id);
      cb();
    } else if (tries++ > 150) {
      window.clearInterval(id);
    }
  }, 100);
}

interface MapViewProps {
  municipios: MunicipiosCollection | null;
}

export function MapView({ municipios }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const hoveredCodeRef = useRef<string | null>(null);
  const loadCarRef = useRef<(() => void) | null>(null);

  const setDrawnFeatures = useStore((s) => s.setDrawnFeatures);
  const drawMode = useStore((s) => s.drawMode);
  const setDrawMode = useStore((s) => s.setDrawMode);
  const drawnCount = useStore((s) => s.drawnFeatures.length); // clear trigger
  const setSelectedMunCode = useStore((s) => s.setSelectedMunCode);
  const selectedMunCode = useStore((s) => s.selectedMunCode);
  const pendingImport = useStore((s) => s.pendingImport);
  const setPendingImport = useStore((s) => s.setPendingImport);

  const layerVisibility = useStore((s) => s.layerVisibility);
  const layerOpacity = useStore((s) => s.layerOpacity);
  const basemapId = useStore((s) => s.basemapId);
  const overlayData = useStore((s) => s.overlayData);
  const carVisible = useStore((s) =>
    CAR ? !!s.layerVisibility[CAR.id] : false,
  );

  // ─── Init map once ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // MapLibre 5 silently ignores `preserveDrawingBuffer` in MapOptions, so we
    // monkey-patch HTMLCanvasElement.getContext briefly to force the flag for
    // any WebGL context created during the next map init. Restored afterwards
    // so no other canvas is affected.
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      attrs?: object,
    ) {
      if (type === "webgl" || type === "webgl2") {
        attrs = { ...(attrs ?? {}), preserveDrawingBuffer: true };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, newline-before-return
      return (originalGetContext as any).call(this, type, attrs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    maplibregl.prewarm();

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BLANK_STYLE,
      center: MAP_INIT.center,
      zoom: MAP_INIT.zoom,
      minZoom: MAP_INIT.minZoom,
      maxZoom: MAP_INIT.maxZoom,
      attributionControl: { compact: true },
      cancelPendingTileRequestsWhileZooming: true,
      fadeDuration: 0,
    });

    // Restore so no other canvas is affected
    HTMLCanvasElement.prototype.getContext = originalGetContext;

    mapRef.current = map;
    setMapInstance(map);

    // In some embed/preview layouts the map is constructed before the container
    // has its final size, leaving the transform at 0×0 so no tiles are ever
    // requested and the style never finishes loading. Nudge resize a few times
    // early on to recompute the transform.
    const resizeKicks = [0, 150, 400, 1000, 2000].map((d) =>
      window.setTimeout(() => map.resize(), d),
    );

    // ─── Controls (top-right) ────────────────────────────────────────────────
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      "top-right",
    );
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showAccuracyCircle: true,
        fitBoundsOptions: { maxZoom: 12 },
      }),
      "top-right",
    );
    map.addControl(
      new maplibregl.ScaleControl({ maxWidth: 120, unit: "metric" }),
      "bottom-left",
    );

    // ─── Draw control (no built-in UI; we drive it via DrawToolbar) ─────────
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      defaultMode: "simple_select",
      styles: drawStyles,
    });
    drawRef.current = draw;

    // mapbox-gl-draw expects IControl shape that maplibre also implements.
    map.addControl(draw as unknown as maplibregl.IControl, "top-right");

    // Sync ALL drawn polygons to the store (the user may draw several).
    const syncDrawn = () => {
      const polys = draw
        .getAll()
        .features.filter(
          (f) => f.geometry?.type === "Polygon",
        ) as unknown as DrawnFeature[];
      setDrawnFeatures(polys);
    };

    map.on("draw.create", syncDrawn);
    map.on("draw.update", syncDrawn);
    map.on("draw.delete", syncDrawn);
    map.on("draw.modechange", (e: { mode: string }) => {
      if (e.mode === "simple_select" || e.mode === "direct_select")
        setDrawMode("idle");
    });

    return () => {
      resizeKicks.forEach((t) => window.clearTimeout(t));
      setMapInstance(null);
      map.remove();
      mapRef.current = null;
      drawRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Basemap raster (swap on basemapId change, kept at the bottom) ────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const basemap = getBasemap(basemapId);

    const applyBasemap = () => {
      if (map.getLayer(BASEMAP_LAYER_ID)) map.removeLayer(BASEMAP_LAYER_ID);
      if (map.getSource(BASEMAP_SOURCE_ID)) map.removeSource(BASEMAP_SOURCE_ID);

      map.addSource(BASEMAP_SOURCE_ID, {
        type: "raster",
        tiles: [basemap.url],
        tileSize: 256,
        attribution: basemap.attribution,
        maxzoom: basemap.maxZoom,
      });

      // Insert just above the background layer so every other layer (municípios,
      // overlay layers, drawing) stays on top.
      const beforeId = map.getLayer("background")
        ? map.getStyle().layers.find((l) => l.id !== "background")?.id
        : map.getStyle().layers[0]?.id;
      map.addLayer(
        { id: BASEMAP_LAYER_ID, type: "raster", source: BASEMAP_SOURCE_ID },
        beforeId,
      );
    };

    whenStyleReady(map, applyBasemap);
  }, [basemapId]);

  // ─── Add municipios source/layer once data + style are ready ──────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !municipios) return;

    const addLayers = () => {
      if (map.getSource(MUN_SOURCE_ID)) return;

      map.addSource(MUN_SOURCE_ID, {
        type: "geojson",
        data: municipios,
        promoteId: "CD_MUN",
      });

      map.addLayer({
        id: MUN_FILL_LAYER,
        type: "fill",
        source: MUN_SOURCE_ID,
        paint: {
          "fill-color": theme.colors.priorityRed,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            0.45,
            ["boolean", ["feature-state", "hover"], false],
            0.28,
            0.14,
          ],
        },
      });

      map.addLayer({
        id: MUN_OUTLINE_LAYER,
        type: "line",
        source: MUN_SOURCE_ID,
        paint: {
          "line-color": theme.colors.priorityRed,
          "line-width": 0.8,
          "line-opacity": 0.85,
        },
      });

      map.addLayer({
        id: MUN_HIGHLIGHT_LAYER,
        type: "line",
        source: MUN_SOURCE_ID,
        paint: {
          "line-color": theme.colors.priorityRedDark,
          "line-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            2.5,
            0,
          ],
        },
      });

      // ─── Hover ───────────────────────────────────────────────────────────
      map.on(
        "mousemove",
        MUN_FILL_LAYER,
        (e: MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
          // While drawing, leave the crosshair cursor and don't highlight.
          if (useStore.getState().drawMode !== "idle") return;
          map.getCanvas().style.cursor = "pointer";
          const code = e.features?.[0]?.id as string | undefined;
          if (!code || code === hoveredCodeRef.current) return;
          if (hoveredCodeRef.current) {
            map.setFeatureState(
              { source: MUN_SOURCE_ID, id: hoveredCodeRef.current },
              { hover: false },
            );
          }
          hoveredCodeRef.current = code;
          map.setFeatureState(
            { source: MUN_SOURCE_ID, id: code },
            { hover: true },
          );
        },
      );

      map.on("mouseleave", MUN_FILL_LAYER, () => {
        if (useStore.getState().drawMode !== "idle") return;
        map.getCanvas().style.cursor = "";
        if (hoveredCodeRef.current) {
          map.setFeatureState(
            { source: MUN_SOURCE_ID, id: hoveredCodeRef.current },
            { hover: false },
          );
          hoveredCodeRef.current = null;
        }
      });

      // ─── Click → select & fit (ignored while drawing) ───────────────────
      map.on(
        "click",
        MUN_FILL_LAYER,
        (e: MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
          // During drawing a click is a vertex, not a municipality selection.
          if (useStore.getState().drawMode !== "idle") return;
          const f = e.features?.[0];
          if (!f) return;
          const code = String(f.id);
          setSelectedMunCode(code);
        },
      );

      // ─── Fit to bbox of class-5 on first load ───────────────────────────
      map.fitBounds(MUNICIPIOS_META.bbox as [number, number, number, number], {
        padding: 40,
        duration: 600,
      });
    };

    whenStyleReady(map, addLayers);
  }, [municipios, setSelectedMunCode]);

  // ─── React to drawMode changes ────────────────────────────────────────────
  useEffect(() => {
    const draw = drawRef.current;
    const map = mapRef.current;
    if (!draw || !map) return;
    if (drawMode === "polygon") {
      draw.changeMode("draw_polygon");

      // Crosshair signals "drawing" instead of the default grab/hand cursor.
      // Force it directly (and via CSS class) so the municípios hover handler,
      // which we suppress during draw, doesn't fight it.
      map.getCanvas().style.cursor = "crosshair";
      map.getContainer().classList.add("croqui-drawing");
    } else if (drawMode === "idle") {
      draw.changeMode("simple_select");
      map.getCanvas().style.cursor = "";
      map.getContainer().classList.remove("croqui-drawing");
    }
  }, [drawMode]);

  // ─── Clear MapboxDraw when the store empties (e.g. the "Limpar" button) ────
  useEffect(() => {
    const draw = drawRef.current;
    if (!draw) return;
    if (drawnCount === 0) draw.deleteAll();
  }, [drawnCount]);

  // ─── Consume imported polygon(s) → ADD to MapboxDraw + fit ─────────────────
  // Appends (doesn't replace) so importing complements hand-drawn polygons, and
  // a single import may carry several polygons.
  useEffect(() => {
    if (!pendingImport || pendingImport.length === 0) return;
    const draw = drawRef.current;
    const map = mapRef.current;
    if (!draw || !map) return;

    pendingImport.forEach((f) => draw.add(f)); // programmatic add → no draw.create…
    setDrawMode("idle");
    const polys = draw
      .getAll()
      .features.filter(
        (f) => f.geometry?.type === "Polygon",
      ) as unknown as DrawnFeature[];
    setDrawnFeatures(polys); // …so sync the store manually

    const fc = { type: "FeatureCollection" as const, features: pendingImport };
    const bb = bbox(fc) as [number, number, number, number];
    map.fitBounds(bb, { padding: 80, duration: 600, maxZoom: 13 });

    setPendingImport(null);
  }, [pendingImport, setDrawnFeatures, setDrawMode, setPendingImport]);

  // ─── React to municipios visibility / opacity ─────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(MUN_FILL_LAYER)) return;
    const visible = layerVisibility[MUN_LAYER_ID] !== false;
    const op = (layerOpacity[MUN_LAYER_ID] ?? 100) / 100;
    const vis = visible ? "visible" : "none";
    for (const id of [MUN_FILL_LAYER, MUN_OUTLINE_LAYER, MUN_HIGHLIGHT_LAYER]) {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", vis);
    }
    if (map.getLayer(MUN_OUTLINE_LAYER)) {
      map.setPaintProperty(MUN_OUTLINE_LAYER, "line-opacity", 0.7 * op);
    }
  }, [layerVisibility, layerOpacity]);

  // ─── Static thematic overlay layers (fill + outline) ──────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const add = () => {
      for (const l of STATIC_OVERLAY_LAYERS) {
        const fc = overlayData[l.id];
        if (!fc || map.getSource(ovSrc(l.id))) continue;
        map.addSource(ovSrc(l.id), {
          type: "geojson",
          data: fc,
          promoteId: l.promoteId,
        });
        const beforeId = drawBeforeId(map);
        const st = useStore.getState();
        const vis0: "visible" | "none" = st.layerVisibility[l.id]
          ? "visible"
          : "none";
        const op0 = (st.layerOpacity[l.id] ?? 100) / 100;
        map.addLayer(
          {
            id: ovFill(l.id),
            type: "fill",
            source: ovSrc(l.id),
            layout: { visibility: vis0 },
            paint: { "fill-color": l.color, "fill-opacity": 0.3 * op0 },
          },
          beforeId,
        );
        map.addLayer(
          {
            id: ovLine(l.id),
            type: "line",
            source: ovSrc(l.id),
            layout: { visibility: vis0 },
            paint: {
              "line-color": l.color,
              "line-width": 1.2,
              "line-opacity": op0,
            },
          },
          beforeId,
        );
      }
    };
    whenStyleReady(map, add);
  }, [overlayData]);

  // ─── CAR (imóveis rurais) — live WFS per UF, loaded by viewport ────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !CAR || !municipios) return;

    // Precompute each municipality's bbox + UF once, to pick UF(s) per viewport.
    const munBoxes = municipios.features.map((f) => ({
      uf: f.properties.NM_UF,
      bb: bbox(f) as [number, number, number, number],
    }));

    const ensure = () => {
      if (map.getSource(ovSrc(CAR.id))) return;
      map.addSource(ovSrc(CAR.id), {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
        promoteId: CAR.promoteId,
      });
      const beforeId = drawBeforeId(map);
      const st = useStore.getState();
      const vis0: "visible" | "none" = st.layerVisibility[CAR.id]
        ? "visible"
        : "none";
      const op0 = (st.layerOpacity[CAR.id] ?? 100) / 100;
      map.addLayer(
        {
          id: ovFill(CAR.id),
          type: "fill",
          source: ovSrc(CAR.id),
          layout: { visibility: vis0 },
          paint: { "fill-color": CAR.color, "fill-opacity": 0.3 * op0 },
        },
        beforeId,
      );
      map.addLayer(
        {
          id: ovLine(CAR.id),
          type: "line",
          source: ovSrc(CAR.id),
          layout: { visibility: vis0 },
          paint: {
            "line-color": CAR.color,
            "line-width": 0.8,
            "line-opacity": op0,
          },
        },
        beforeId,
      );
    };
    whenStyleReady(map, ensure);

    let ctrl: AbortController | null = null;
    let debounce: number | undefined;

    const load = () => {
      const src = map.getSource(ovSrc(CAR.id)) as
        | maplibregl.GeoJSONSource
        | undefined;
      if (!src) return;
      const visible = !!useStore.getState().layerVisibility[CAR.id];
      if (!visible || map.getZoom() < (CAR.minZoomForLoad ?? 12)) {
        src.setData({ type: "FeatureCollection", features: [] });

        return;
      }
      const b = map.getBounds();
      const vb: [number, number, number, number] = [
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth(),
      ];
      const ufs = ufsFromNames(
        munBoxes.filter((m) => boxesOverlap(m.bb, vb)).map((m) => m.uf),
      );
      if (ufs.length === 0) {
        src.setData({ type: "FeatureCollection", features: [] });

        return;
      }
      const bboxStr = `${vb[0]},${vb[1]},${vb[2]},${vb[3]},EPSG:4326`;
      ctrl?.abort();
      ctrl = new AbortController();
      fetchCarFeatures(
        CAR.wfsUrl!,
        CAR.wfsTypePrefix!,
        ufs,
        bboxStr,
        CAR.maxFeatures ?? 4000,
        ctrl.signal,
      )
        .then((features) => {
          const s = map.getSource(ovSrc(CAR.id)) as
            | maplibregl.GeoJSONSource
            | undefined;
          s?.setData({ type: "FeatureCollection", features });
        })
        .catch((err: Error) => {
          if (err.name !== "AbortError") console.warn("[CAR WFS]", err.message);
        });
    };

    const onMoveEnd = () => {
      if (debounce) window.clearTimeout(debounce);
      debounce = window.setTimeout(load, 400);
    };
    map.on("moveend", onMoveEnd);
    loadCarRef.current = load; // let the toggle effect kick a load immediately

    return () => {
      map.off("moveend", onMoveEnd);
      if (debounce) window.clearTimeout(debounce);
      ctrl?.abort();
      loadCarRef.current = null;
    };
  }, [municipios]);

  // Kick a CAR load right when the layer is toggled on (not only on moveend).
  useEffect(() => {
    loadCarRef.current?.();
  }, [carVisible]);

  // ─── Overlay layers visibility / opacity (static + CAR) ───────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const l of OVERLAY_LAYERS) {
      const vis = layerVisibility[l.id] ? "visible" : "none";
      const op = (layerOpacity[l.id] ?? 100) / 100;
      if (map.getLayer(ovFill(l.id))) {
        map.setLayoutProperty(ovFill(l.id), "visibility", vis);
        map.setPaintProperty(ovFill(l.id), "fill-opacity", 0.3 * op);
      }
      if (map.getLayer(ovLine(l.id))) {
        map.setLayoutProperty(ovLine(l.id), "visibility", vis);
        map.setPaintProperty(ovLine(l.id), "line-opacity", op);
      }
    }
  }, [layerVisibility, layerOpacity, overlayData, municipios]);

  // ─── Highlight selected municipality + fit to it ──────────────────────────
  const lastSelectedRef = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !municipios) return;
    if (!map.getSource(MUN_SOURCE_ID)) return;

    if (
      lastSelectedRef.current &&
      lastSelectedRef.current !== selectedMunCode
    ) {
      map.setFeatureState(
        { source: MUN_SOURCE_ID, id: lastSelectedRef.current },
        { selected: false },
      );
    }
    if (selectedMunCode) {
      map.setFeatureState(
        { source: MUN_SOURCE_ID, id: selectedMunCode },
        { selected: true },
      );

      // Find feature → fit
      const feature = municipios.features.find(
        (f) => f.properties.CD_MUN === selectedMunCode,
      );
      if (feature) {
        const bb = bbox(feature) as [number, number, number, number];
        map.fitBounds(bb, { padding: 80, duration: 600, maxZoom: 11 });
      }
    }
    lastSelectedRef.current = selectedMunCode;
  }, [selectedMunCode, municipios]);

  return (
    <>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      <SearchBar municipios={municipios} />
      <LayersPanel />
      <BasemapSwitcher />
      <FloatingLegend />
      <DrawToolbar />
    </>
  );
}

// ─── Drawing styles ──────────────────────────────────────────────────────────
// Yellow polygon with a dark halo behind the stroke. The halo (drawnHalo)
// is rendered first and slightly wider, so the bright yellow stroke on top
// stays legible against any underlying colour (red municipios, satellite, etc).
const drawStyles = [
  // Fill — light, just a tint so the area is visible
  {
    id: "gl-draw-polygon-fill-inactive",
    type: "fill",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    paint: { "fill-color": theme.colors.drawnYellow, "fill-opacity": 0.18 },
  },
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    paint: { "fill-color": theme.colors.drawnYellow, "fill-opacity": 0.22 },
  },

  // Halo (dark slate, wider) — drawn behind the bright stroke
  {
    id: "gl-draw-polygon-halo-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": theme.colors.drawnHalo,
      "line-width": 6,
      "line-opacity": 0.9,
    },
  },
  {
    id: "gl-draw-polygon-halo-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": theme.colors.drawnHalo,
      "line-width": 6,
      "line-opacity": 0.9,
    },
  },

  // Main stroke — bright yellow on top of the halo
  {
    id: "gl-draw-polygon-stroke-inactive",
    type: "line",
    filter: [
      "all",
      ["==", "active", "false"],
      ["==", "$type", "Polygon"],
      ["!=", "mode", "static"],
    ],
    layout: { "line-cap": "round", "line-join": "round" },
    paint: { "line-color": theme.colors.drawnYellow, "line-width": 3 },
  },
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
    layout: { "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": theme.colors.drawnYellow,
      "line-width": 3,
      "line-dasharray": [0.2, 2],
    },
  },

  // Vertices — yellow with dark halo ring
  {
    id: "gl-draw-polygon-and-line-vertex-inactive",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": theme.colors.drawnYellow,
      "circle-stroke-color": theme.colors.drawnHalo,
      "circle-stroke-width": 2,
    },
  },
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "meta", "midpoint"], ["==", "$type", "Point"]],
    paint: {
      "circle-radius": 3,
      "circle-color": theme.colors.drawnYellow,
      "circle-stroke-color": theme.colors.drawnHalo,
      "circle-stroke-width": 1,
    },
  },
];
