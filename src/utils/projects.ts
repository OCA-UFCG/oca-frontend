// Conteúdo estático do redesign (Contentful depois).
// ponytail: descrições são rascunho a partir dos READMEs; a OCA revisa o texto.

export interface IProject {
  slug: string;
  name: string;
  category: string;
  partner?: string;
  status?: string; // ex.: "Concluído"
  period?: string; // ex.: "2016–2020"
  area?: string; // área de abrangência
  studyArea?: string; // área de estudo
  description: string;
  image: string;
  url?: string;
  screenshot?: string; // tela da plataforma, no bloco "Plataforma digital"
}

export const PROJECTS: IProject[] = [
  {
    slug: "caativar",
    name: "Caativar",
    category: "Plataforma digital",
    description:
      "Mapas e análises do carbono florestal da Caatinga, com camadas, recortes territoriais e estatísticas por área.",
    image: "/redesign/projeto-caativar.jpg",
  },
  {
    slug: "data-nordeste",
    name: "Data Nordeste",
    category: "Plataforma digital",
    partner: "Sudene",
    description:
      "Portal público da Sudene com dados e indicadores do Nordeste, painéis interativos, publicações e conjuntos de dados abertos.",
    image: "/redesign/projeto-data-nordeste.jpg",
    url: "https://datanordeste.sudene.gov.br",
    screenshot: "/redesign/plataforma-data-nordeste.jpg",
  },
  {
    slug: "atlas-da-desertificacao",
    name: "Atlas da Desertificação",
    category: "Plataforma digital",
    partner: "INSA",
    description:
      "Atualização do Atlas das Áreas Suscetíveis à Desertificação no Brasil, com dados atuais, novos indicadores e consulta pública.",
    image: "/redesign/sobre-territorio.jpg",
  },
  {
    slug: "sedes",
    name: "SEDES",
    category: "Plataforma digital",
    description:
      "Índices territoriais em mapa interativo, com análise por camada, relatórios municipais automáticos e análise multicritério.",
    image: "/redesign/projeto-sedes.jpg",
  },
];

// Ferramentas que já estão no ar (card "Plataformas" da Home).
export const PLATFORMS = [
  {
    name: "Data Nordeste",
    description:
      "Dados e indicadores do Nordeste em painéis interativos e conjuntos de dados abertos.",
    image: "/redesign/plataforma-data-nordeste.jpg",
    url: "https://datanordeste.sudene.gov.br",
  },
  {
    name: "Plataforma do OCA",
    description:
      "Mapas interativos com camadas de dados ambientais e territoriais do Semiárido.",
    image: "/redesign/plataforma-oca.jpg",
    url: "/map",
  },
  {
    name: "Croqui",
    description:
      "Desenhe ou importe uma área, veja área, perímetro e municípios atingidos e exporte o croqui em PDF.",
    image: "/redesign/plataforma-croqui.jpg",
    url: "/croqui",
  },
];
