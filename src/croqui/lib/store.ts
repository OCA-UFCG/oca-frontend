// Single Zustand store, organised by concern (see DOCUMENTACAO_TECNICA §8 for
// the WebSIG pattern — same shape, much smaller surface).

import { create } from "zustand";
import type { FeatureCollection } from "geojson";
import type {
  DrawMode,
  DrawnFeature,
  PolygonResults,
  LayerVisibility,
  LayerOpacity,
} from "@/croqui/types";
import { RASTER_LAYERS, VECTOR_LAYERS } from "@/croqui/config/layers";
import { DEFAULT_BASEMAP_ID } from "@/croqui/config/basemaps";

interface StoreState {
  // ─── Drawing (the user may draw several polygons) ──────────────────────────
  drawMode: DrawMode;
  drawnFeatures: DrawnFeature[];
  setDrawMode: (mode: DrawMode) => void;
  setDrawnFeatures: (features: DrawnFeature[]) => void;
  clearDrawing: () => void;

  // ─── Results ──────────────────────────────────────────────────────────────
  results: PolygonResults | null;
  resultsLoading: boolean;
  setResults: (r: PolygonResults | null) => void;
  updateResults: (patch: Partial<PolygonResults>) => void;
  setResultsLoading: (loading: boolean) => void;

  // ─── Selection (municipality clicked / searched) ──────────────────────────
  selectedMunCode: string | null;
  setSelectedMunCode: (code: string | null) => void;

  // ─── Imported polygons (consumed by MapView → MapboxDraw) ─────────────────
  pendingImport: DrawnFeature[] | null;
  setPendingImport: (f: DrawnFeature[] | null) => void;

  // ─── Thematic overlay data (static GeoJSON shared by map + stats) ──────────
  overlayData: Record<string, FeatureCollection>;
  setOverlayData: (id: string, fc: FeatureCollection) => void;

  // ─── Layers (visibility, opacity, tile URLs) ──────────────────────────────
  layerVisibility: LayerVisibility;
  layerOpacity: LayerOpacity;
  rasterTileUrls: Record<string, string>;
  rasterLoading: Record<string, boolean>;
  rasterError: Record<string, string | null>;
  toggleLayer: (id: string) => void;
  setOpacity: (id: string, opacity: number) => void;
  setRasterTileUrl: (id: string, url: string | null) => void;
  setRasterLoading: (id: string, loading: boolean) => void;
  setRasterError: (id: string, error: string | null) => void;

  // ─── Basemap ────────────────────────────────────────────────────────────────
  basemapId: string;
  setBasemap: (id: string) => void;

  // ─── UI ───────────────────────────────────────────────────────────────────
  layersPanelOpen: boolean;
  toggleLayersPanel: () => void;
  setLayersPanelOpen: (open: boolean) => void;

  // ─── Export ───────────────────────────────────────────────────────────────
  exporting: boolean;
  setExporting: (exporting: boolean) => void;
}

const initialVisibility: LayerVisibility = {};
const initialOpacity: LayerOpacity = {};
for (const v of VECTOR_LAYERS) {
  initialVisibility[v.id] = v.defaultVisible;
  initialOpacity[v.id] = v.defaultOpacity;
}
for (const r of RASTER_LAYERS) {
  initialVisibility[r.id] = r.defaultVisible;
  initialOpacity[r.id] = r.defaultOpacity;
}

export const useStore = create<StoreState>((set) => ({
  drawMode: "idle",
  drawnFeatures: [],
  setDrawMode: (drawMode) => set({ drawMode }),
  setDrawnFeatures: (drawnFeatures) => set({ drawnFeatures }),
  clearDrawing: () =>
    set({ drawnFeatures: [], results: null, drawMode: "idle" }),

  results: null,
  resultsLoading: false,
  setResults: (results) => set({ results }),
  updateResults: (patch) =>
    set((state) =>
      state.results ? { results: { ...state.results, ...patch } } : {},
    ),
  setResultsLoading: (resultsLoading) => set({ resultsLoading }),

  selectedMunCode: null,
  setSelectedMunCode: (selectedMunCode) => set({ selectedMunCode }),

  pendingImport: null,
  setPendingImport: (pendingImport) => set({ pendingImport }),

  overlayData: {},
  setOverlayData: (id, fc) =>
    set((state) => ({ overlayData: { ...state.overlayData, [id]: fc } })),

  layerVisibility: initialVisibility,
  layerOpacity: initialOpacity,
  rasterTileUrls: {},
  rasterLoading: {},
  rasterError: {},
  toggleLayer: (id) =>
    set((state) => ({
      layerVisibility: {
        ...state.layerVisibility,
        [id]: !state.layerVisibility[id],
      },
    })),
  setOpacity: (id, opacity) =>
    set((state) => ({
      layerOpacity: { ...state.layerOpacity, [id]: opacity },
    })),
  setRasterTileUrl: (id, url) =>
    set((state) => {
      const next = { ...state.rasterTileUrls };
      if (url === null) delete next[id];
      else next[id] = url;

      return { rasterTileUrls: next };
    }),
  setRasterLoading: (id, loading) =>
    set((state) => ({
      rasterLoading: { ...state.rasterLoading, [id]: loading },
    })),
  setRasterError: (id, error) =>
    set((state) => ({ rasterError: { ...state.rasterError, [id]: error } })),

  basemapId: DEFAULT_BASEMAP_ID,
  setBasemap: (basemapId) => set({ basemapId }),

  layersPanelOpen: false,
  toggleLayersPanel: () =>
    set((state) => ({ layersPanelOpen: !state.layersPanelOpen })),
  setLayersPanelOpen: (layersPanelOpen) => set({ layersPanelOpen }),

  exporting: false,
  setExporting: (exporting) => set({ exporting }),
}));
