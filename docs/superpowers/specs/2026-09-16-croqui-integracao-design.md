# Integração do Croqui no oca-frontend

Data: 2026-09-16

## Objetivo

Migrar o código do repositório `croqui` (`observatorio-croqui`) para dentro do
`oca-frontend`, substituindo o iframe atual em `/croqui` por código nativo do
projeto. Todas as funcionalidades do croqui e do oca-frontend devem continuar
funcionando, e a rota `/croqui` deve se apresentar ao usuário exatamente como
hoje.

## Ponto de partida

| | croqui | oca-frontend |
|---|---|---|
| Next / React | 16.2.6 / 19.2.4 | ^14.2.28 / ^18 |
| Roteamento | App Router (`app/`) | App Router (`src/app/`) |
| Build | `output: "export"`, estático | server-rendered, tem API routes |
| Estilização | inline styles + `config/theme.ts` + `app/globals.css` | styled-components (`GlobalStyles`) + sass |
| Alias `@/*` | `./*` | `./src/*` |
| Tamanho | ~4.700 LOC | — |
| Backend próprio | nenhum | `api/ee`, `api/tiles`, `api/mail` |

Hoje `src/app/croqui/page.tsx` renderiza um `<iframe>` de
`https://observatorio-croqui.oca-portal.com` ocupando `100vw`/`100vh`, sem o
header do oca. O usuário vê apenas o header próprio do croqui.

## Decisões

1. **Adaptar o croqui a Next 14 / React 18**, mantendo o oca-frontend na versão
   atual. O croqui não usa nenhuma API exclusiva do React 19 — importa apenas
   `Metadata`, `next/image`, `next/dynamic` e hooks básicos. Custo de adaptação
   de código: zero.
2. **A rota `/croqui` fica visualmente idêntica ao iframe de hoje**: header
   próprio do croqui, tela cheia, sem a navegação do oca. A migração é
   puramente técnica. (Esta decisão foi revista duas vezes durante a execução —
   ver "Emenda: Header do OCA" no fim deste documento — e terminou de volta na
   formulação original.)
3. **O código do croqui vira um módulo autocontido em `src/croqui/`**, em vez de
   ser dissolvido nas pastas compartilhadas do oca. Evita colisão de nomes
   (`Header`, `SearchBar` já existem no oca), mantém a fronteira da feature
   explícita e preserva a legibilidade de um eventual diff futuro contra o repo
   de origem.
4. **Isolamento de CSS por route groups com dois root layouts.** Ver seção
   própria abaixo.
5. **O repositório `croqui` e o deploy `observatorio-croqui.oca-portal.com`
   ficam como estão**, servindo de fallback até a versão integrada ser validada.
   Aposentá-los é decisão posterior, fora do escopo desta spec.

## Arquitetura

### Estrutura de arquivos

```
src/croqui/
  components/   App.tsx, MapView.tsx, StatsPanel.tsx, Header.tsx,
                SearchBar.tsx, DrawToolbar.tsx, LayersPanel.tsx,
                FloatingLegend.tsx, BasemapSwitcher.tsx, ExportModal.tsx,
                ImportVerticesModal.tsx, OverlayChart.tsx, CroquiButton.tsx
  lib/          store.ts, computeStats.ts, exportPdf.ts, carWfs.ts,
                parseVertices.ts, saveExport.ts, recaptcha.ts,
                mapInstance.ts, format.ts
  config/       theme.ts, map.ts, basemaps.ts, layers.ts, exportSink.ts
  types/        index.ts
  data/         municipios_c5_meta.json
  croqui.css

src/app/
  (site)/       layout.tsx  ← layout atual do oca (Providers, GlobalStyles, Lato, GA)
                page.tsx, about/, map/, team/, collab/, contact-us/,
                infra/
  (croqui)/     layout.tsx  ← <html>/<body> próprios, DM Sans, croqui.css
                croqui/page.tsx
  api/          inalterado (rotas sem layout)
  health/       inalterado (route.ts, sem layout)
  favicon.ico, globalStyles.tsx, theme.ts, Providers.tsx  ← inalterados

public/
  data/         municipios_c5.geojson, assentamentos.geojson,
                territorios_indigenas.geojson, territorios_quilombolas.geojson
  logo-observatorio.png
```

Não há colisão: o `public/` do oca não tem `data/` nem arquivo de logo com esse
nome. Os quatro GeoJSONs somam 1,5 MB e continuam sendo buscados em runtime por
`fetch("/data/*.geojson")`, exatamente como hoje.

### Reescrita de imports

Mecânica, sem ambiguidade:

- `@/components/X` → `@/croqui/components/X`
- `@/lib/X` → `@/croqui/lib/X`
- `@/config/X` → `@/croqui/config/X`
- `@/types` → `@/croqui/types`
- Imports relativos entre componentes (`./Header`) permanecem como estão.

Exceção única: `config/map.ts` faz
`import meta from "@/public/data/municipios_c5_meta.json"`. O alias `@/` do oca
aponta para `src/`, e `public/` está fora. Como esse JSON é consumido em tempo
de build (e não servido), ele passa a viver em `src/croqui/data/` e o import
vira `@/croqui/data/municipios_c5_meta.json`.

### Ponto de entrada

`src/app/(croqui)/croqui/page.tsx` mantém a mesma `metadata` de hoje
(`title: "Croqui | Observatório da Caatinga"`) e o mesmo comportamento de
carregamento do croqui original: componente cliente com
`dynamic(() => import("@/croqui/components/App"), { ssr: false })` e a tela
intermediária "Carregando mapa…". O `ssr: false` é obrigatório — o MapLibre
precisa de `window`.

## Isolamento de CSS

Este é o risco central da integração, e ele é bidirecional.

### O oca vaza para dentro do croqui

`src/app/globalStyles.tsx` aplica um reset agressivo em todas as páginas:

| Regra | Efeito no croqui |
|---|---|
| `details { display: none }` | **Quebra funcional**: some com as seções recolhíveis do `StatsPanel` |
| `html { display:flex; flex-direction:column; align-items:center }` | Altera o enquadramento do root do croqui |
| Reset Meyer com `font: inherit` e `color: dark-gray` | Tipografia e cor alteradas onde não há inline style |
| `p, li { text-align: justify; margin-bottom: 1rem }` | Afeta `StatsPanel`, `ExportModal`, `ImportVerticesModal` |
| `ol, ul { margin-left: 1rem }` | Afeta as listas do `StatsPanel` |

### O croqui vaza para fora

`app/globals.css` define `html, body { overflow: hidden }`, a fonte DM Sans no
`body` e overrides de scrollbar. Carregado uma vez, afetaria as demais páginas
do site.

### Solução

Dois root layouts via route groups do App Router. `src/app/layout.tsx` deixa de
existir na raiz; em seu lugar:

- `src/app/(site)/layout.tsx` — conteúdo idêntico ao layout atual: `<html>`/
  `<body>`, fonte Lato, `Providers` (que traz `StyledComponentsRegistry`,
  `ThemeProvider` e `GlobalStyles`) e `GoogleAnalytics`.
- `src/app/(croqui)/layout.tsx` — `<html lang="pt-BR">`/`<body>` próprios, DM
  Sans via `next/font/google` (substituindo o `<link>` para o Google Fonts do
  layout original do croqui), e os imports de CSS:
  `./croqui.css`, `maplibre-gl/dist/maplibre-gl.css` e
  `@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css`.

Cada grupo tem seu próprio `<html>`/`<body>`, então o `GlobalStyles` não alcança
o croqui e o `croqui.css` não alcança o site. As URLs não mudam: route groups
entre parênteses não entram no path.

`src/croqui/croqui.css` é o `app/globals.css` do croqui transposto sem alteração
de conteúdo — as classes globais que os componentes consomem (`skeleton`,
`fade-in`, `ui-press`, `croqui-drawing`) e os overrides do MapLibre continuam
valendo, agora confinados ao grupo `(croqui)`.

**Consequência aceita:** navegar entre o site e `/croqui` passa a ser full page
load em vez de client-side navigation. É o mesmo comportamento de hoje, já que
o croqui é servido por um iframe apontando para outro domínio.

`src/app/api/` e `src/app/health/` são route handlers, não têm layout e
permanecem na raiz, fora dos dois grupos. Apenas as rotas com `page.tsx` migram
para `(site)/`: `page.tsx` (home), `about/`, `collab/`, `contact-us/`, `infra/`,
`map/` e `team/`.

## Dependências

A adicionar no `package.json` do oca-frontend, nas mesmas versões do croqui:

- Runtime: `@mapbox/mapbox-gl-draw`, `@turf/area`, `@turf/bbox`,
  `@turf/boolean-intersects`, `@turf/centroid`, `@turf/helpers`,
  `@turf/intersect`, `@turf/length`, `@turf/union`, `jspdf`, `jspdf-autotable`,
  `react-icons`, `zustand`
- Tipos: `@types/geojson`, `@types/mapbox__mapbox-gl-draw`

Nenhuma tem peer dependency em React 19.

### maplibre-gl: versão única

O croqui usa `^5.24.0`, o oca `^4.2.0`. Só uma versão pode ser instalada.

A superfície de API do croqui (`addSource`, `addLayer`, `getStyle`,
`fitBounds`, `setFeatureState`, `setPaintProperty`, `setLayoutProperty`,
`prewarm`, `NavigationControl`, `GeolocateControl`, `ScaleControl`, tipos
`GeoJSONSource`/`MapGeoJSONFeature`/`IControl`) e a do `MapTiff.tsx`
(`Map`, `Popup`, `NavigationControl`, `addSource`, `addLayer`) são estáveis
entre v4 e v5. O shim de compatibilidade do `mapbox-gl-draw` em `MapView.tsx`
patcheia nomes de classe (`maplibregl-canvas`, `maplibregl-ctrl`,
`maplibregl-ctrl-group`, `maplibregl-ctrl-attrib`) idênticos nas duas versões.

**Decisão:** subir o oca-frontend para `maplibre-gl@^5` e manter o croqui
intocado. O croqui só foi exercitado em v5 e concentra a lógica de mapa;
`MapTiff.tsx` são 317 linhas com API estável, cobertas por verificação manual
da página `/map`.

Alternativa descartada: instalar as duas versões via alias npm
(`"maplibre-gl-v4": "npm:maplibre-gl@^4"`), isolando por rota. Duplica
manutenção e peso de bundle para cobrir um risco que a verificação manual já
cobre.

## Variáveis de ambiente

O croqui não exige configuração: `config/exportSink.ts` lê as três variáveis
abaixo e cai em fallbacks hardcoded quando ausentes. Esse comportamento é
preservado.

**Colisão a resolver:** o croqui lê `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, que o
oca-frontend já usa no `ContactForm` com uma chave **diferente**. Como o segredo
do croqui vive no Apps Script dele, herdar a chave do oca quebraria a validação
do export.

Renomeações em `src/croqui/config/exportSink.ts`:

| Antes | Depois |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `NEXT_PUBLIC_CROQUI_RECAPTCHA_SITE_KEY` |
| `NEXT_PUBLIC_EXPORT_WEBHOOK_URL` | `NEXT_PUBLIC_CROQUI_EXPORT_WEBHOOK_URL` |
| `NEXT_PUBLIC_EXPORT_TOKEN` | `NEXT_PUBLIC_CROQUI_EXPORT_TOKEN` |

Os fallbacks hardcoded atuais são mantidos, então o croqui integrado funciona
sem nenhuma configuração nova. As três variáveis são documentadas em
`.env.sample`.

## Deploy

Sem mudanças. `Dockerfile.production` faz `COPY . .` seguido de `npm run build`,
então `public/data/` e `src/croqui/` entram automaticamente. O croqui deixa de
precisar de `output: "export"`: passa a ser uma rota client-side dentro do app
server-rendered do oca, o que não altera seu comportamento, já que ele nunca
dependeu de servidor.

`next.config.mjs` do oca já tem `images.unoptimized: true`, então os usos de
`next/image` do croqui (`Header.tsx`) funcionam sem ajuste.

Arquivos do croqui que **não** são migrados: `next.config.ts`, `render.yaml`,
`Dockerfile`, `.dockerignore`, `eslint.config.mjs`, `tsconfig.json`,
`package.json`, `app/layout.tsx` e `app/page.tsx` (substituídos pelos
equivalentes do oca). Os utilitários em `scripts/` (`prep_vector_layers.py`,
`gpkg_to_geojson.py`, `make_idt_cog.py`, `sheets_webhook.gs`) são ferramentas de
preparação de dados que não fazem parte do app; ficam no repositório de origem.

## Verificação

Não há suíte de testes automatizados em nenhum dos dois repositórios, então a
verificação é manual e roteirizada, comparando o croqui atual e o integrado lado
a lado.

**Croqui integrado (`/croqui`):**

- Busca de endereço (`SearchBar`)
- Desenho de polígono, edição de vértices e limpeza do desenho
- Importação de vértices (`ImportVerticesModal`), incluindo entrada inválida
- Troca de basemap nos quatro provedores (`BasemapSwitcher`)
- Painel de camadas e legenda flutuante (`LayersPanel`, `FloatingLegend`)
- **Seções recolhíveis do `StatsPanel`** — o `<details>` que o reset do oca
  quebrava; é o teste que valida o isolamento de CSS
- Estatísticas por município: área, perímetro, centroide, percentuais
- Camadas temáticas estáticas (indígenas, quilombolas, assentamentos)
- Consulta CAR ao GeoServer via WFS, incluindo o estado de erro
  ("GeoServer indisponível") e o cancelamento por `AbortController`
- Gráfico de sobreposição (`OverlayChart`)
- reCAPTCHA no `ExportModal`, com a nova variável de ambiente
- Exportação do PDF (`jspdf` + `jspdf-autotable`) e registro na planilha via
  Apps Script

**oca-frontend (regressão):**

- `/map` — `MapTiff` com maplibre-gl v5: carregamento dos tiffs, popups,
  camadas de estados e municípios, `NavigationControl`
- Home e demais páginas movidas para `(site)/`, todas respondendo nas mesmas
  URLs
- `/health` continua respondendo (route handler que não foi movido)
- `ContactForm` com reCAPTCHA, confirmando que a renomeação da variável do
  croqui não afetou a chave do oca
- `npm run build` completo sem erros

## Sequência de trabalho

Branch nova a partir da `main`, com commits separados para que o histórico
distinga mudança estrutural de código importado:

1. Reestruturar `src/app/` em route groups `(site)` e `(croqui)`, mantendo a
   rota `/croqui` ainda como iframe. Verificar que o site continua idêntico.
2. Adicionar as dependências e subir `maplibre-gl` para v5. Verificar `/map`.
3. Importar o código do croqui em `src/croqui/` com os imports reescritos, os
   assets em `public/`, e o `croqui.css`.
4. Trocar o iframe pelo import dinâmico do `App` e ajustar o layout do grupo
   `(croqui)`.
5. Renomear as variáveis de ambiente e documentar no `.env.sample`.
6. Rodar o roteiro de verificação completo.

## Fora de escopo

- Aposentar o repositório `croqui` ou o deploy
  `observatorio-croqui.oca-portal.com`
- Preservar o histórico git do croqui dentro do oca-frontend
- Unificar a identidade visual do croqui com a do site (fonte, cores, header)
- Introduzir testes automatizados


---

# Emenda: Header do OCA na rota /croqui — proposta e revertida

Data: 2026-09-16, durante a execução do plano.

## Histórico

A decisão 2 original — "a rota fica visualmente idêntica ao iframe de hoje" —
foi revista a pedido do usuário, que pediu o Header do OCA no topo da rota. Foi
implementado assim (commit `7572838`): Header do OCA acima, header do croqui
abaixo, croqui ocupando a altura restante, sem Footer.

Ao ver o resultado, o usuário considerou que os dois headers empilhados ficaram
ruins visualmente e pediu a remoção. Revertido no commit `696af8a`. A rota
voltou à formulação original da spec.

## O que ficou registrado dessa ida e volta

A auditoria feita para viabilizar o Header continua sendo informação útil, caso
a ideia volte à mesa:

- Nenhum componente da árvore do Header do OCA (`HeaderSection`, `Header`,
  `HeaderModal`, `Dropdown`, `Icon`) importa `@/app/globalStyles`. Todos se
  estilizam sozinhos, via styled-components.
- Eles dependem do `ThemeProvider` (`theme.colors.green`, `theme.colors.black`).
- Usam apenas os elementos `a`, `div`, `li`, `nav` e `ul`.
- A **única** regra do reset do oca de que a árvore depende é a `padding` zerada
  do `<ul>`: `Header.styles.ts` define `margin: 0` no `NavList` mas não a
  `padding`. `Dropdown.styles.tsx` já zera `margin` e `list-style` por conta
  própria.

Ou seja: é viável trazer o Header sem trazer o `GlobalStyles`, envolvendo-o em
`StyledComponentsRegistry` + `ThemeProvider` e repondo aquela regra escopada por
uma classe. O que não é viável é trazer o `GlobalStyles` junto — o
`details { display: none }` dele esconde as seções recolhíveis do `StatsPanel`,
que é o defeito que justifica toda a arquitetura de route groups.

## Estado final

O grupo `(croqui)` não carrega styled-components nem `ThemeProvider`. A raiz do
`src/croqui/components/App.tsx` permanece em `height: "100vh"`, como no
original — a exceção que havia sido aberta à restrição de não editar o código
migrado foi desfeita junto com o Header.
