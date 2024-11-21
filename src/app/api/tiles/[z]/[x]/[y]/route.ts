import path from "path";
import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";

type TileResponse = {
  tile_data: Buffer;
};

// Path to your MBTiles file
const MBTILES_PATH = path.join(
  process.cwd(),
  "public",
  "brazil-states.mbtiles",
);

// Open the MBTiles database
const db = new sqlite3.Database(MBTILES_PATH, (err) => {
  if (err) {
    console.error("Failed to open MBTiles file:", err.message);
  } else {
    console.log("Connected to MBTiles database.");
  }
});

// Convert TMS (Tile Map Service) Y coordinate to Google XYZ Y
function tmsToGoogleY(y: number, zoom: number) {
  return Math.pow(2, zoom) - 1 - y;
}

// Handle API requests
export async function GET(
  req: NextRequest,
  { params }: { params: { z: string; x: string; y: string } },
): Promise<Response> {
  const { z, x, y } = params; // Extract z, x, y from the route parameters
  const zoom = parseInt(z);
  const col = parseInt(x);
  const row = tmsToGoogleY(parseInt(y), zoom);

  const query = `
    SELECT tile_data FROM tiles
    WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?
  `;

  return new Promise<Response>((resolve) => {
    db.get(query, [zoom, col, row], (err, row: TileResponse) => {
      if (err) {
        console.error("Database query error:", err.message);
        resolve(
          NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
          ),
        );

        return;
      }

      if (row) {
        const headers = new Headers();
        headers.set("Content-Type", "application/vnd.mapbox-vector-tile");
        headers.set("Content-Encoding", "gzip");

        resolve(new NextResponse(row.tile_data, { status: 200, headers }));
      }
    });
  });
}

// Close the database connection on shutdown
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
