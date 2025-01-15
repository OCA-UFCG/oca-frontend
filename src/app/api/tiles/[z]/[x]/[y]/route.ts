import path from "path";
import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

type TileResponse = {
  tile_data: Buffer;
};

// Configuração do Redis
const redis = new Redis({
  host: "localhost",
  port: 6379,
});

const CACHE_TTL = 60 * 60 * 24; // 24 horas em segundos
const CACHE_PREFIX = "tile:";

const MBTILES_PATH = path.join(
  process.cwd(),
  "public",
  "brazil-states.mbtiles",
);

const db = new sqlite3.Database(MBTILES_PATH, (err) => {
  if (err) {
    console.error("Failed to open MBTiles file:", err.message);
  } else {
    console.log("Connected to MBTiles database.");
  }
});

function adaptToGoogleY(y: number, zoom: number) {
  return Math.pow(2, zoom) - 1 - y;
}

async function getTileFromCache(key: string): Promise<Buffer | null> {
  try {
    const cachedData = await redis.getBuffer(key);
    if (cachedData) {
      console.log("Cache HIT:", key);

      return cachedData;
    }
    console.log("Cache MISS:", key);

    return null;
  } catch (error) {
    console.error("Redis get error:", error);

    return null;
  }
}

async function setTileInCache(key: string, data: Buffer): Promise<void> {
  try {
    await redis.set(key, data, "EX", CACHE_TTL);
    console.log("Cached:", key);
  } catch (error) {
    console.error("Redis set error:", error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { z: string; x: string; y: string } },
): Promise<Response> {
  const { z, x, y } = params;
  const zoom = parseInt(z);
  const col = parseInt(x);
  const row = adaptToGoogleY(parseInt(y), zoom);

  // Criar chave única para o cache
  const cacheKey = `${CACHE_PREFIX}${zoom}:${col}:${row}`;

  try {
    // Tentar buscar do cache primeiro
    const cachedTile = await getTileFromCache(cacheKey);

    if (cachedTile) {
      const headers = new Headers();
      headers.set("Content-Type", "application/vnd.mapbox-vector-tile");
      headers.set("Content-Encoding", "gzip");

      return new NextResponse(cachedTile, { status: 200, headers });
    }

    // Se não estiver em cache, buscar do banco
    return new Promise<Response>((resolve) => {
      const query = `
        SELECT tile_data FROM tiles
        WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?
      `;

      db.get(query, [zoom, col, row], async (err, row: TileResponse) => {
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
          // Salvar no cache antes de retornar
          await setTileInCache(cacheKey, row.tile_data);

          const headers = new Headers();
          headers.set("Content-Type", "application/vnd.mapbox-vector-tile");
          headers.set("Content-Encoding", "gzip");
          resolve(new NextResponse(row.tile_data, { status: 200, headers }));
        } else {
          resolve(
            NextResponse.json({ error: "Tile not found" }, { status: 404 }),
          );
        }
      });
    });
  } catch (error) {
    console.error("Request error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Gerenciamento de conexões
process.on("SIGINT", async () => {
  try {
    await redis.quit();
    console.log("Redis connection closed.");

    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});
