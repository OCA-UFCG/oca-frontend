import { NextRequest, NextResponse } from "next/server";

// Senha da prévia do redesign (/preview). O repositório é público, então aqui fica
// só o SHA-256 da senha; a senha em si é passada à parte, fora do repositório.
const USER = "oca";
const PASSWORD_SHA256 =
  "1a2f4acceb13d748cb2e03c0b19ced2e2fd9dc093216224ce237c35de898b806";

// Fora dos buscadores e fora do cache do proxy: a página da prévia é estática e o
// nginx na frente do site guardaria a resposta autenticada e a serviria a qualquer
// um, sem passar por aqui. X-Accel-Expires: 0 desliga o cache do nginx.
const PRIVATE = {
  "X-Robots-Tag": "noindex, nofollow",
  "X-Accel-Expires": "0",
};

const sha256 = async (text: string) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)),
    ),
    (b) => b.toString(16).padStart(2, "0"),
  ).join("");

export async function middleware(request: NextRequest) {
  const [scheme, encoded] = (request.headers.get("authorization") ?? "").split(
    " ",
  );

  if (scheme === "Basic" && encoded) {
    try {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const password = decoded.slice(sep + 1);

      if (
        sep > 0 &&
        user === USER &&
        (await sha256(password)) === PASSWORD_SHA256
      ) {
        const response = NextResponse.next();
        for (const [key, value] of Object.entries(PRIVATE)) {
          response.headers.set(key, value);
        }

        return response;
      }
    } catch {
      // base64 inválido: cai na recusa abaixo
    }
  }

  return new NextResponse("Acesso restrito.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="OCA preview"', ...PRIVATE },
  });
}

export const config = { matcher: ["/preview", "/preview/:path*"] };
