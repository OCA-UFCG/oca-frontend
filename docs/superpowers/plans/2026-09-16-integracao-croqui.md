# Integração do Croqui no oca-frontend — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o iframe da rota `/croqui` por código nativo, migrando o repositório `croqui` para `src/croqui/` sem perder nenhuma funcionalidade dos dois projetos.

**Architecture:** O código do croqui vira um módulo autocontido em `src/croqui/`, consumido por uma rota fina que faz import dinâmico com `ssr: false`. O CSS dos dois projetos é isolado por route groups do App Router com dois root layouts independentes — `(site)` mantém o `GlobalStyles` do oca, `(croqui)` tem `<html>`/`<body>` próprios. `maplibre-gl` converge para v5.

**Tech Stack:** Next 14 (App Router), React 18, TypeScript, maplibre-gl v5, @mapbox/mapbox-gl-draw, turf.js, zustand, jspdf, styled-components (só no grupo `(site)`).

**Spec:** `docs/superpowers/specs/2026-09-16-croqui-integracao-design.md`

## Global Constraints

- **Não subir versão de Next ou React.** O oca-frontend permanece em `next@^14.2.28` e `react@^18`. O croqui não usa nenhuma API exclusiva do React 19; nenhum arquivo dele precisa mudar por causa de versão.
- **`maplibre-gl` em versão única, `^5`.** Nunca instalar as duas versões em paralelo.
- **A rota `/croqui` deve ficar visualmente idêntica ao iframe de hoje:** header próprio do croqui, tela cheia, sem a navegação do oca.
- **Nenhuma URL pública muda.** Route groups entre parênteses não entram no path.
- **`src/app/globalStyles.tsx` NÃO pode ser movido** — 11 componentes o importam por `@/app/globalStyles`. O mesmo vale para `src/app/Providers.tsx` e `src/app/theme.ts`, que permanecem na raiz de `src/app/`.
- **Todo o código migrado do croqui é copiado sem alteração de lógica.** As únicas edições permitidas são: caminhos de import, nomes de variáveis de ambiente e as duas entradas de fonte em `config/theme.ts`.
- **Idioma dos commits e comentários: português**, seguindo o histórico do repositório.
- **Autoria:** `Marcos Antônio <marcos.pereira@lsd.ufcg.edu.br>`. Nunca registrar co-autor.

## Nota sobre verificação

Nenhum dos dois repositórios tem suíte de testes, e introduzir testes automatizados está **fora de escopo** por decisão da spec. Portanto este plano não segue o ciclo TDD. No lugar dele, cada tarefa tem um portão automatizado (`npx tsc --noEmit` e/ou `npm run build`, que falham de verdade em erro de tipo ou de import quebrado) seguido de checagens manuais roteirizadas no navegador. Os passos manuais listam exatamente o que abrir e o que observar — nunca "verificar se funciona".

Atenção: `next.config.mjs` tem `eslint.ignoreDuringBuilds: true`, então `npm run build` **não** detecta problemas de lint. O portão real de correção é o `tsc --noEmit`.

Antes de começar, garanta que está na branch `feat/integra-croqui` (criada junto com a spec) e que `npm ci` já rodou.

---

### Task 1: Reestruturar `src/app/` em route groups

Move as rotas existentes para `(site)/` e a rota do croqui para `(croqui)/`, criando os dois root layouts. A rota `/croqui` continua sendo o iframe nesta tarefa — o objetivo aqui é provar que a reestruturação sozinha não quebra nada.

**Files:**
- Create: `src/app/(site)/layout.tsx` (movido de `src/app/layout.tsx`)
- Create: `src/app/(croqui)/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/(site)/page.tsx`
- Move: `src/app/about/`, `src/app/collab/`, `src/app/contact-us/`, `src/app/infra/`, `src/app/map/`, `src/app/team/` → `src/app/(site)/`
- Move: `src/app/croqui/` → `src/app/(croqui)/croqui/`
- Unchanged: `src/app/api/`, `src/app/health/`, `src/app/favicon.ico`, `src/app/globalStyles.tsx`, `src/app/Providers.tsx`, `src/app/theme.ts`

**Interfaces:**
- Consumes: nada de tarefas anteriores.
- Produces: o diretório `src/app/(croqui)/` e seu `layout.tsx`, onde a Task 4 vai adicionar os imports de CSS e as fontes. O arquivo `src/app/(croqui)/croqui/page.tsx`, que a Task 4 substitui.

`src/app/health/` é um route handler (`route.ts`), não uma página — assim como `src/app/api/`, não tem layout e **permanece na raiz**. Só as 7 rotas com `page.tsx` migram.

- [ ] **Step 1: Criar os diretórios dos grupos e mover as rotas**

Os parênteses precisam de escape no shell.

```bash
cd /home/marcos-antonio/Projetos/oca/oca-frontend
mkdir -p "src/app/(site)" "src/app/(croqui)"

git mv src/app/layout.tsx "src/app/(site)/layout.tsx"
git mv src/app/page.tsx   "src/app/(site)/page.tsx"

for d in about collab contact-us infra map team; do
  git mv "src/app/$d" "src/app/(site)/$d"
done

git mv src/app/croqui "src/app/(croqui)/croqui"
```

- [ ] **Step 2: Corrigir o import relativo do layout movido**

`src/app/(site)/layout.tsx` importava `./Providers`, que agora está um nível acima. Essa é a **única** alteração de conteúdo no arquivo. O resultado completo:

```tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Providers } from "../Providers";

const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Observatório da Caatinga",
  description: "Observatório da Caatinga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={lato.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>{children}</Providers>
      </body>

      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
```

- [ ] **Step 3: Criar o root layout do grupo `(croqui)`**

Versão mínima nesta tarefa — só `<html>`/`<body>`, sem `GlobalStyles` e sem `Providers`. As fontes e o CSS entram na Task 4.

Crie `src/app/(croqui)/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croqui | Observatório da Caatinga",
  description: "Observatório Croqui",
};

export default function CroquiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Remover a `metadata` duplicada da página do croqui**

`src/app/(croqui)/croqui/page.tsx` declarava a própria `metadata`, que agora vive no layout do grupo. Substitua o arquivo inteiro por:

```tsx
const CROQUI_URL = "https://observatorio-croqui.oca-portal.com";

export default function CroquiPage() {
  return (
    <iframe
      src={CROQUI_URL}
      title="Observatório Croqui"
      style={{ border: "none", width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
```

- [ ] **Step 5: Portão automatizado — typecheck e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos passam. O build deve listar as rotas `/`, `/about`, `/collab`, `/contact-us`, `/croqui`, `/infra`, `/map`, `/team`, `/health` e as de `/api` — **as mesmas de antes**, sem `(site)` nem `(croqui)` em nenhum path.

Se `tsc` reclamar de `Cannot find module './Providers'`, o Step 2 não foi aplicado.

- [ ] **Step 6: Verificação manual — o site não mudou**

```bash
npm run dev
```

Abra e confirme que cada uma renderiza como antes da mudança:

- `http://localhost:3000/` — home com header, carrossel e rodapé
- `http://localhost:3000/about`
- `http://localhost:3000/map` — mapa carrega, popups abrem
- `http://localhost:3000/team`
- `http://localhost:3000/collab`
- `http://localhost:3000/infra`
- `http://localhost:3000/contact-us` — formulário com o reCAPTCHA visível
- `http://localhost:3000/health` — responde (JSON, sem layout)
- `http://localhost:3000/croqui` — o iframe ainda carrega o site externo

- [ ] **Step 7: Commit**

```bash
git add -A src/app
git commit -m "refactor: separa src/app em route groups (site) e (croqui)

Prepara o isolamento de CSS entre o site e o croqui: cada grupo passa a
ter seu próprio root layout. As URLs não mudam — route groups entre
parênteses não entram no path.

globalStyles.tsx, Providers.tsx e theme.ts permanecem na raiz de
src/app/ porque 11 componentes os importam por @/app/globalStyles.
api/ e health/ são route handlers, não têm layout e também ficam."
```

---

### Task 2: Converger `maplibre-gl` para v5 e adicionar as dependências do croqui

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (gerado por `npm install`)

**Interfaces:**
- Consumes: nada da Task 1.
- Produces: os pacotes que `src/croqui/` importa na Task 3 — `maplibre-gl@^5`, `@mapbox/mapbox-gl-draw`, `@turf/*`, `jspdf`, `jspdf-autotable`, `react-icons`, `zustand`, e os tipos `@types/geojson` e `@types/mapbox__mapbox-gl-draw`.

O único consumidor de `maplibre-gl` no oca hoje é `src/components/MapTiff/MapTiff.tsx` (317 linhas). Ele usa `maplibregl.Map`, `maplibregl.Popup`, `maplibregl.NavigationControl`, `addSource`, `addLayer` — API estável entre v4 e v5. Esta tarefa existe separada justamente para que a regressão de `/map` seja avaliada isoladamente.

- [ ] **Step 1: Instalar as dependências nas versões do croqui**

```bash
cd /home/marcos-antonio/Projetos/oca/oca-frontend
npm install \
  maplibre-gl@^5.24.0 \
  @mapbox/mapbox-gl-draw@^1.5.1 \
  @turf/area@^7.3.5 \
  @turf/bbox@^7.3.5 \
  @turf/boolean-intersects@^7.3.5 \
  @turf/centroid@^7.3.5 \
  @turf/helpers@^7.3.5 \
  @turf/intersect@^7.3.5 \
  @turf/length@^7.3.5 \
  @turf/union@^7.3.5 \
  jspdf@^4.2.1 \
  jspdf-autotable@^5.0.8 \
  react-icons@^5.6.0 \
  zustand@^5.0.13

npm install --save-dev \
  @types/geojson@^7946.0.16 \
  @types/mapbox__mapbox-gl-draw@^1.4.9
```

- [ ] **Step 2: Confirmar que só existe uma versão de maplibre-gl**

```bash
npm ls maplibre-gl
```

Esperado: uma única linha resolvendo para `maplibre-gl@5.x`. Se aparecer mais de uma versão na árvore, pare e resolva antes de seguir — o Global Constraint proíbe as duas em paralelo.

- [ ] **Step 3: Portão automatizado — typecheck e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos passam. Se `tsc` acusar erro em `src/components/MapTiff/MapTiff.tsx`, é uma incompatibilidade real de tipos v4→v5: corrija ali mesmo, registrando no commit o que mudou.

- [ ] **Step 4: Verificação manual — regressão de `/map`**

```bash
npm run dev
```

Em `http://localhost:3000/map`, confirme:

- O mapa base renderiza e responde a zoom/pan
- O `NavigationControl` aparece no canto inferior esquerdo
- Selecionar um tiff na lista carrega a camada raster correspondente
- Passar o mouse sobre o mapa abre o popup com o valor, e ele some ao sair
- As camadas de estados e municípios do Brasil desenham os contornos
- O console do navegador não tem erro vindo de `maplibre-gl`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/MapTiff/MapTiff.tsx
git commit -m "chore: sobe maplibre-gl para v5 e adiciona dependências do croqui

Converge maplibre-gl numa versão única: o croqui usa ^5 e concentra a
lógica de mapa, enquanto MapTiff.tsx usa API estável entre v4 e v5.

Adiciona mapbox-gl-draw, turf, jspdf, react-icons e zustand, que o
módulo src/croqui/ vai consumir."
```

(Se o Step 3 não exigiu mudança em `MapTiff.tsx`, remova esse caminho do `git add`.)

---

### Task 3: Importar o código do croqui em `src/croqui/`

Copia o módulo e os assets, reescrevendo os caminhos de import. Nada ainda é renderizado — a rota continua sendo o iframe. O portão desta tarefa é o typecheck do código importado.

**Files:**
- Create: `src/croqui/components/` — `App.tsx`, `BasemapSwitcher.tsx`, `CroquiButton.tsx`, `DrawToolbar.tsx`, `ExportModal.tsx`, `FloatingLegend.tsx`, `Header.tsx`, `ImportVerticesModal.tsx`, `LayersPanel.tsx`, `MapView.tsx`, `OverlayChart.tsx`, `SearchBar.tsx`, `StatsPanel.tsx`
- Create: `src/croqui/lib/` — `carWfs.ts`, `computeStats.ts`, `exportPdf.ts`, `format.ts`, `mapInstance.ts`, `parseVertices.ts`, `recaptcha.ts`, `saveExport.ts`, `store.ts`
- Create: `src/croqui/config/` — `basemaps.ts`, `exportSink.ts`, `layers.ts`, `map.ts`, `theme.ts`
- Create: `src/croqui/types/index.ts`
- Create: `src/croqui/data/municipios_c5_meta.json`
- Create: `src/croqui/croqui.css`
- Create: `public/data/municipios_c5.geojson`, `public/data/assentamentos.geojson`, `public/data/territorios_indigenas.geojson`, `public/data/territorios_quilombolas.geojson`
- Create: `public/logo-observatorio.png`

**Interfaces:**
- Consumes: as dependências instaladas na Task 2.
- Produces: `src/croqui/components/App.tsx`, cujo **default export** é o componente `App` — é ele que a Task 4 importa dinamicamente. `src/croqui/croqui.css`, importado pelo layout na Task 4. `src/croqui/config/exportSink.ts`, com as constantes `EXPORT_WEBHOOK_URL`, `EXPORT_TOKEN` e `RECAPTCHA_SITE_KEY`, que a Task 5 renomeia as origens.

Não migre: `next.config.ts`, `render.yaml`, `Dockerfile`, `.dockerignore`, `eslint.config.mjs`, `tsconfig.json`, `package.json`, `app/layout.tsx`, `app/page.tsx`, nem `scripts/` (ferramentas de preparação de dados, que ficam no repo de origem).

- [ ] **Step 1: Copiar o módulo e os assets**

```bash
CROQUI=/home/marcos-antonio/Projetos/oca/croqui
OCA=/home/marcos-antonio/Projetos/oca/oca-frontend
cd "$OCA"

mkdir -p src/croqui/data public/data

cp -r "$CROQUI/components" src/croqui/components
cp -r "$CROQUI/lib"        src/croqui/lib
cp -r "$CROQUI/config"     src/croqui/config
cp -r "$CROQUI/types"      src/croqui/types

cp "$CROQUI/app/globals.css" src/croqui/croqui.css

cp "$CROQUI/public/data/municipios_c5_meta.json" src/croqui/data/

cp "$CROQUI/public/data/municipios_c5.geojson" \
   "$CROQUI/public/data/assentamentos.geojson" \
   "$CROQUI/public/data/territorios_indigenas.geojson" \
   "$CROQUI/public/data/territorios_quilombolas.geojson" \
   public/data/

cp "$CROQUI/public/logo-observatorio.png" public/
```

- [ ] **Step 2: Reescrever os aliases de import**

O alias `@/` aponta para a raiz no croqui e para `src/` no oca. São 6 prefixos, todos mecânicos. Rode na ordem exata abaixo — `@/types` por último, para não colidir com os demais:

```bash
cd /home/marcos-antonio/Projetos/oca/oca-frontend
FILES=$(find src/croqui -name "*.ts" -o -name "*.tsx")

sed -i 's|@/components/|@/croqui/components/|g' $FILES
sed -i 's|@/lib/|@/croqui/lib/|g'               $FILES
sed -i 's|@/config/|@/croqui/config/|g'         $FILES
sed -i 's|"@/types"|"@/croqui/types"|g'         $FILES
```

Imports relativos entre componentes (`./Header`, `./MapView`) continuam válidos e **não** devem ser tocados.

- [ ] **Step 3: Corrigir o import do meta JSON**

`src/croqui/config/map.ts` importa `@/public/data/municipios_c5_meta.json`. `public/` está fora do alias `@/` do oca, e esse JSON é consumido em tempo de build (não é servido), então ele passou para `src/croqui/data/` no Step 1.

Em `src/croqui/config/map.ts`, troque a linha 4:

```ts
import meta from "@/public/data/municipios_c5_meta.json";
```

por:

```ts
import meta from "@/croqui/data/municipios_c5_meta.json";
```

- [ ] **Step 4: Conferir que não sobrou nenhum alias antigo**

```bash
grep -rn '@/\(components\|lib\|config\|types\|public\)/' src/croqui/ ; \
grep -rn '"@/types"' src/croqui/
```

Esperado: **nenhuma saída**. Qualquer linha impressa é um import que os Steps 2–3 não cobriram.

- [ ] **Step 5: Portão automatizado — typecheck**

```bash
npx tsc --noEmit
```

Esperado: passa. Erros aqui são de import não resolvido (alias esquecido) ou de tipo faltando (dependência não instalada na Task 2).

O `npm run build` ainda **não** compila esses arquivos, porque nenhuma rota os importa — por isso o portão desta tarefa é o `tsc`.

- [ ] **Step 6: Commit**

```bash
git add src/croqui public/data public/logo-observatorio.png
git commit -m "feat: importa o código do croqui em src/croqui/

Traz components, lib, config e types do repositório croqui como módulo
autocontido, com os aliases de import reescritos de @/x para @/croqui/x.

O meta JSON dos municípios vira módulo em src/croqui/data/ porque é
consumido em build; os GeoJSONs pesados ficam em public/data/ e seguem
sendo buscados por fetch em runtime.

Nenhuma rota consome esse código ainda."
```

---

### Task 4: Ligar a rota `/croqui` ao código nativo

Troca o iframe pelo import dinâmico do `App` e completa o root layout do grupo `(croqui)` com as fontes e o CSS.

**Files:**
- Modify: `src/app/(croqui)/layout.tsx`
- Modify: `src/app/(croqui)/croqui/page.tsx`
- Modify: `src/croqui/croqui.css`
- Modify: `src/croqui/config/theme.ts:49-52`

**Interfaces:**
- Consumes: o default export `App` de `src/croqui/components/App.tsx` e o arquivo `src/croqui/croqui.css`, ambos da Task 3.
- Produces: a rota `/croqui` funcional. Nada depende dela nas tarefas seguintes.

- [ ] **Step 1: Completar o root layout do grupo `(croqui)`**

Carrega DM Sans e DM Mono por `next/font/google` (substituindo o `<link>` para o Google Fonts que o croqui original usava) e importa os três CSS. Substitua `src/app/(croqui)/layout.tsx` inteiro por:

```tsx
import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";

import "@/croqui/croqui.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--croqui-font-sans",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--croqui-font-mono",
});

export const metadata: Metadata = {
  title: "Croqui | Observatório da Caatinga",
  description: "Observatório Croqui",
};

export default function CroquiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Apontar o CSS e o theme para as variáveis de fonte**

`next/font` gera nomes de família próprios, expostos pelas CSS variables declaradas no Step 1. Os dois pontos que citavam `"DM Sans"` / `"DM Mono"` por nome literal precisam passar a ler as variáveis.

Em `src/croqui/croqui.css`, na regra `body`, troque a linha:

```css
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

por:

```css
  font-family: var(--croqui-font-sans), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

Em `src/croqui/config/theme.ts`, troque o bloco `font`:

```ts
  font: {
    ui: '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"DM Mono", ui-monospace, "Cascadia Code", "Consolas", monospace',
  },
```

por:

```ts
  font: {
    ui: 'var(--croqui-font-sans), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: 'var(--croqui-font-mono), ui-monospace, "Cascadia Code", "Consolas", monospace',
  },
```

Essas duas chaves são consumidas como `theme.font.ui` e `theme.font.mono` em inline styles de `FloatingLegend.tsx`, `ExportModal.tsx`, `DrawToolbar.tsx` e `OverlayChart.tsx` — `var()` funciona normalmente em `fontFamily` inline.

- [ ] **Step 3: Substituir o iframe pelo import dinâmico**

Reproduz o `app/page.tsx` original do croqui, incluindo a tela intermediária. O `ssr: false` é obrigatório: o MapLibre precisa de `window`, e sem isso há erro de hidratação.

Substitua `src/app/(croqui)/croqui/page.tsx` inteiro por:

```tsx
// O app é inteiramente client-side (o MapLibre precisa de `window`), então
// importamos dinamicamente com SSR desligado para evitar erro de hidratação.

"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/croqui/components/App"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "#fafaf7",
        color: "#6b6b62",
        fontFamily: "var(--croqui-font-sans), system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      Carregando mapa…
    </div>
  ),
});

export default function CroquiPage() {
  return <App />;
}
```

- [ ] **Step 4: Portão automatizado — typecheck e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos passam, e agora o build compila `src/croqui/` de verdade, porque a rota passou a importá-lo. `/croqui` deve aparecer na tabela de rotas.

- [ ] **Step 5: Verificação manual — o croqui integrado**

```bash
npm run dev
```

Em `http://localhost:3000/croqui`, percorra o roteiro completo:

- A tela "Carregando mapa…" aparece e dá lugar ao mapa
- O header do croqui ocupa o topo, com o logo e o título "Gerador de Croquis" — e **sem** o header do oca
- `SearchBar`: buscar um endereço move o mapa
- `BasemapSwitcher`: alternar entre Carto Positron, OpenStreetMap, Esri Satélite e Google Satélite troca o fundo
- `DrawToolbar`: desenhar um polígono (o cursor vira mira), editar vértices e limpar o desenho
- **`StatsPanel`: abrir e fechar as seções recolhíveis (`<details>`)** — este é o teste que valida o isolamento de CSS; se elas estiverem invisíveis, o `GlobalStyles` do oca está vazando
- `StatsPanel`: área, perímetro, centroide e a lista de municípios com percentuais
- `LayersPanel` e `FloatingLegend`: ligar/desligar as camadas temáticas (indígenas, quilombolas, assentamentos) reflete no mapa e na legenda
- A camada CAR consulta o GeoServer e sai do estado "carregando"
- `OverlayChart`: o gráfico de sobreposição desenha
- `ImportVerticesModal`: importar vértices válidos desenha o polígono; entrada inválida mostra erro
- `ExportModal`: o reCAPTCHA renderiza e o PDF é gerado com as tabelas

- [ ] **Step 6: Verificação manual — o site não regrediu**

Confirme que o `croqui.css` não vazou para fora do grupo:

- `http://localhost:3000/` — a home tem a fonte Lato, o espaçamento de sempre e **rola normalmente** (o `overflow: hidden` do croqui não pode ter escapado)
- `http://localhost:3000/about` — parágrafos justificados e listas como antes
- `http://localhost:3000/map` — segue funcionando

- [ ] **Step 7: Commit**

```bash
git add "src/app/(croqui)" src/croqui/croqui.css src/croqui/config/theme.ts
git commit -m "feat: serve o croqui nativamente em /croqui, sem iframe

A rota passa a importar src/croqui/components/App dinamicamente com
ssr: false, reproduzindo o comportamento do app original.

O root layout do grupo (croqui) carrega DM Sans e DM Mono por
next/font/google e os CSS do croqui, do maplibre e do mapbox-gl-draw.
Como o grupo tem <html>/<body> próprios, o GlobalStyles do oca não
alcança o croqui — em particular a regra 'details { display: none }',
que escondia as seções recolhíveis do StatsPanel."
```

---

### Task 5: Renomear as variáveis de ambiente do croqui

O croqui lê `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, que o oca **já usa** em `src/components/ContactForm/ContactForm.tsx:18` com uma chave diferente. Como o segredo do croqui vive no Apps Script dele, herdar a chave do oca quebraria a validação do export. As outras duas variáveis são renomeadas por simetria.

**Files:**
- Modify: `src/croqui/config/exportSink.ts`
- Modify: `.env.sample`

**Interfaces:**
- Consumes: `src/croqui/config/exportSink.ts` da Task 3.
- Produces: as constantes exportadas mantêm exatamente os mesmos nomes (`EXPORT_WEBHOOK_URL`, `EXPORT_TOKEN`, `RECAPTCHA_SITE_KEY`) — só as variáveis de ambiente de origem mudam, então nenhum consumidor precisa ser tocado.

- [ ] **Step 1: Renomear as três variáveis em `exportSink.ts`**

Os fallbacks hardcoded são **mantidos exatamente como estão**, para que o croqui integrado funcione sem configuração nova. Substitua `src/croqui/config/exportSink.ts` inteiro por:

```ts
// Onde cada export é registrado: a URL do Web App do Google Apps Script
// (termina em "/exec"). Veja scripts/sheets_webhook.gs no repositório croqui
// para publicar.
//
// Cole a URL abaixo OU defina NEXT_PUBLIC_CROQUI_EXPORT_WEBHOOK_URL no ambiente.
// Vazio = salvamento desligado (o PDF continua exportando normalmente).

export const EXPORT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CROQUI_EXPORT_WEBHOOK_URL?.trim() ||
  "https://script.google.com/macros/s/AKfycbwCr-AGEWjy03YQesGmvk5d3T0n_u5S86Y5y8hHVjdnConJKy5cH_GLApnqCvJAAQI/exec";

// Token compartilhado opcional; precisa bater com TOKEN no sheets_webhook.gs.
// Vazio = sem checagem de token.
export const EXPORT_TOKEN =
  process.env.NEXT_PUBLIC_CROQUI_EXPORT_TOKEN?.trim() || "";

// reCAPTCHA v2 (checkbox) — Site Key (PÚBLICA, pode ficar no cliente).
// Crie em https://www.google.com/recaptcha/admin e registre os domínios
// (localhost + o domínio de produção). A chave SECRETA NÃO vai aqui — ela fica
// em Script Properties (RECAPTCHA_SECRET) no Apps Script (lado servidor).
// Vazio = sem captcha (o app funciona normalmente).
//
// O prefixo CROQUI_ é obrigatório: NEXT_PUBLIC_RECAPTCHA_SITE_KEY já é usada
// pelo ContactForm do oca, com uma chave diferente. Herdar aquela chave
// quebraria a validação do export, cujo segredo vive no Apps Script do croqui.
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_CROQUI_RECAPTCHA_SITE_KEY?.trim() ||
  "6LdvtQ4tAAAAALbArC4ic_nYbvqq5YrxFcalivwQ";
```

- [ ] **Step 2: Documentar as três variáveis no `.env.sample`**

Acrescente ao final de `.env.sample`:

```bash
# Croqui — registro dos exports numa planilha via Google Apps Script.
# Todas opcionais: sem elas o croqui usa os fallbacks em
# src/croqui/config/exportSink.ts e funciona normalmente.
export NEXT_PUBLIC_CROQUI_EXPORT_WEBHOOK_URL=""
export NEXT_PUBLIC_CROQUI_EXPORT_TOKEN=""

# Croqui — reCAPTCHA v2 (checkbox) do modal de exportação.
# Separada de NEXT_PUBLIC_RECAPTCHA_SITE_KEY (usada pelo ContactForm):
# são chaves diferentes, com segredos em lugares diferentes.
export NEXT_PUBLIC_CROQUI_RECAPTCHA_SITE_KEY=""
```

- [ ] **Step 3: Confirmar que nenhuma variável antiga sobrou em `src/croqui/`**

```bash
grep -rn "NEXT_PUBLIC_RECAPTCHA_SITE_KEY\|NEXT_PUBLIC_EXPORT_WEBHOOK_URL\|NEXT_PUBLIC_EXPORT_TOKEN" src/croqui/
```

Esperado: **nenhuma saída**.

```bash
grep -rn "NEXT_PUBLIC_RECAPTCHA_SITE_KEY" src/components/ContactForm/ContactForm.tsx
```

Esperado: a linha 18 do `ContactForm`, **intacta** — o oca continua com a variável dele.

- [ ] **Step 4: Portão automatizado — typecheck e build**

```bash
npx tsc --noEmit && npm run build
```

Esperado: ambos passam.

- [ ] **Step 5: Verificação manual — os dois reCAPTCHAs coexistem**

```bash
npm run dev
```

- Em `http://localhost:3000/croqui`, desenhe um polígono, abra o `ExportModal` e confirme que o checkbox do reCAPTCHA renderiza sem erro de "Invalid site key" no console
- Em `http://localhost:3000/contact-us`, confirme que o reCAPTCHA do formulário também renderiza

- [ ] **Step 6: Commit**

```bash
git add src/croqui/config/exportSink.ts .env.sample
git commit -m "fix: prefixa as variáveis de ambiente do croqui com CROQUI_

NEXT_PUBLIC_RECAPTCHA_SITE_KEY já era usada pelo ContactForm do oca com
uma chave diferente. Como o segredo do croqui vive no Apps Script dele,
herdar a chave do oca quebraria a validação do export.

As três variáveis passam a ter o prefixo NEXT_PUBLIC_CROQUI_ e são
documentadas no .env.sample. Os fallbacks hardcoded são mantidos, então
o croqui continua funcionando sem configuração nova."
```

---

### Task 6: Verificação final e limpeza

Roda o roteiro completo da spec contra um build de produção e remove o que ficou órfão.

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: tudo das Tasks 1–5.
- Produces: nada — é a tarefa de fechamento.

- [ ] **Step 1: Confirmar que nada aponta mais para o croqui externo**

```bash
grep -rn "observatorio-croqui" src/ README.md
```

Esperado: **nenhuma saída**. Se a URL do iframe ainda aparecer em `src/`, a Task 4 não foi concluída.

- [ ] **Step 2: Build de produção e execução**

```bash
npm run build && npm start
```

Esperado: build sem erro; o servidor sobe na porta 3000.

- [ ] **Step 3: Roteiro completo no build de produção**

Com `npm start` rodando, percorra em `http://localhost:3000`:

**Croqui (`/croqui`)** — busca de endereço; desenho, edição e limpeza de polígono; importação de vértices (válida e inválida); os quatro basemaps; painel de camadas e legenda; **as seções `<details>` do `StatsPanel`**; área, perímetro, centroide e municípios com percentuais; as três camadas temáticas estáticas; a consulta CAR ao GeoServer, incluindo o estado de erro "GeoServer indisponível"; o `OverlayChart`; o reCAPTCHA do `ExportModal`; a geração do PDF com as tabelas; e o registro na planilha.

**Regressão do oca** — `/` (home), `/about`, `/collab`, `/contact-us` (com reCAPTCHA), `/infra`, `/map` (MapTiff em maplibre v5: tiffs, popups, contornos de estados e municípios), `/team`, e `/health` respondendo.

Confirme também que o console do navegador não acusa erro em nenhuma das rotas.

- [ ] **Step 4: Registrar o croqui no README**

Acrescente à seção de estrutura do `README.md`:

```markdown
### Croqui

O gerador de croquis vive em `src/croqui/` e é servido pela rota `/croqui`.
É um módulo autocontido, inteiramente client-side: o mapa (MapLibre), as
estatísticas zonais e a exportação em PDF rodam no navegador, sem backend
próprio.

Ele fica no route group `(croqui)`, que tem `<html>`/`<body>` próprios e **não**
carrega o `GlobalStyles` (styled-components) do restante do site — o reset
global do oca é incompatível com o CSS do croqui. As demais rotas ficam no
grupo `(site)`. Os dois grupos não alteram nenhuma URL.

Os GeoJSONs das camadas ficam em `public/data/` e são buscados em runtime.
A configuração opcional do registro de exports está no `.env.sample`, nas
variáveis prefixadas com `NEXT_PUBLIC_CROQUI_`.

Origem do código: repositório `croqui` (`observatorio-croqui`), mantido como
histórico. O deploy antigo segue no ar como fallback até esta versão ser
validada em produção.
```

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: registra o croqui integrado no README

Documenta o módulo src/croqui/, o porquê dos route groups (site) e
(croqui), e as variáveis de ambiente prefixadas com NEXT_PUBLIC_CROQUI_."
```

- [ ] **Step 6: Revisar o diff completo antes do PR**

```bash
git log --oneline main..HEAD
git diff main..HEAD --stat
```

Esperado: 8 commits — a spec, este plano e um por tarefa (Tasks 1 a 6) — e um `--stat` em que as mudanças fora de `src/croqui/`, `src/app/`, `public/` e `docs/` se limitem a `package.json`, `package-lock.json`, `.env.sample`, `README.md` e, se a Task 2 exigiu, `src/components/MapTiff/MapTiff.tsx`.

Qualquer outro arquivo do oca no diff é escopo que vazou — investigue antes de abrir o PR.

---

## Rollback

Se a verificação da Task 6 reprovar e for preciso voltar atrás rapidamente: a rota `/croqui` pode voltar ao iframe revertendo só a Task 4 (`git revert` do commit "serve o croqui nativamente"), sem desfazer os route groups nem a importação do código. O deploy `observatorio-croqui.oca-portal.com` continua no ar justamente para isso.
