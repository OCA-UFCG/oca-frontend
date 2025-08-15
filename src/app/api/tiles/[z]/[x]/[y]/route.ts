import path from "path";
import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";

// ==============================
// Database connection
// ==============================

/**
 * Path to the MBTiles file containing Brazilian states data
 */
const MBTILES_PATH = path.join(
  process.cwd(),
  "public",
  "tiles",
  "brazil-states.mbtiles",
);

/**
 * Initialize connection to the MBTiles database
 * This connection will be reused across all requests
 */
const db = new sqlite3.Database(MBTILES_PATH, (err) => {
  if (err) {
    console.error("Failed to open MBTiles file:", err.message);
  } else {
    console.log("Connected to MBTiles database.");
  }
});

/**
 * Setup connection closing when the application is terminated
 */
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

// ==============================
// Utility functions
// ==============================

/**
 * Interface for tile data returned by the database
 */
interface TileData {
  tile_data: Buffer;
}

/**
 * Converts Y coordinates from TMS format to Google/MapLibre format
 *
 * In MapLibre, Y increases from top to bottom (Google format)
 * In MBTiles, Y increases from bottom to top (TMS format)
 *
 * @param y - Y coordinate in TMS format
 * @param zoom - Zoom level
 * @returns Y coordinate converted to Google/MapLibre format
 */
function convertTMStoGoogleY(y: number, zoom: number): number {
  return Math.pow(2, zoom) - 1 - y;
}

/**
 * Fetches tile data from the database
 *
 * @param zoom - Zoom level
 * @param x - X coordinate
 * @param y - Y coordinate
 * @returns Promise with tile data or null if not found
 */
function getTileData(
  zoom: number,
  x: number,
  y: number,
): Promise<TileData | null> {
  const adjustedY = convertTMStoGoogleY(y, zoom);

  const query = `
    SELECT tile_data FROM tiles
    WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(query, [zoom, x, adjustedY], (err, row: TileData) => {
      if (err) {
        console.error("Database query error:", err.message);
        reject(err);

        return;
      }
      resolve(row || null);
    });
  });
}

// ==============================
// Request handler
// ==============================

/**
 * Handles GET requests to serve map tiles
 *
 * @param req - Next.js request object
 * @param params - URL parameters (z: zoom, x: column, y: row)
 * @returns HTTP response with the tile or error message
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { z: string; x: string; y: string } },
): Promise<Response> {
  try {
    const { z, x, y } = params;
    const zoom = parseInt(z);
    const col = parseInt(x);
    const row = parseInt(y);

    if (isNaN(zoom) || isNaN(col) || isNaN(row))
      return NextResponse.json(
        { error: "Invalid tile coordinates" },
        { status: 400 },
      );

    const tileData = await getTileData(zoom, col, row);

    if (tileData) {
      const headers = new Headers();
      headers.set("Content-Type", "application/vnd.mapbox-vector-tile");
      headers.set("Content-Encoding", "gzip");

      const uint8array = new Uint8Array(tileData.tile_data);

      return new NextResponse(uint8array.buffer, {
        status: 200,
        headers,
      });
    } else {
      return new NextResponse(null, { status: 204 });
    }
  } catch (error) {
    console.error("Error serving tile:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
