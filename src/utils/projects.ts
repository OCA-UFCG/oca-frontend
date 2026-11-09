// Conteúdo estático do redesign (Contentful depois). Textos do Figma de 08/11/2026.

export interface IPlatform {
  name: string;
  title: string; // "Conheça o …"
  intro: string; // linha em negrito ao fim de "Sobre o projeto"
  summary: string;
  about: string[];
  cta: string; // linha final de "Sobre a plataforma"
  logo: string;
  screenshot: string;
  url?: string; // sem URL pública confirmada, o botão "Acessar" some
}

export interface IProject {
  slug: string;
  name: string; // título do card
  title?: string; // título da página, quando difere do card
  short?: string; // nome em "Conheça outros projetos"
  status: string;
  period?: string;
  partners: string[]; // nomes de PARTNERS (constants.ts)
  summary: string; // texto do card
  image: string;
  banner: string;
  about: string[];
  gallery?: string[];
  others: string[]; // slugs em "Conheça outros projetos"
  platform?: IPlatform;
}

export const PROJECTS: IProject[] = [
  {
    slug: "data-nordeste",
    name: "Data Nordeste",
    status: "Em andamento",
    period: "2025 – atualmente",
    partners: ["Sudene"],
    summary:
      "O Data Nordeste reúne dados oficiais sobre os municípios do Nordeste, do Semiárido, da Caatinga e da área de atuação da Sudene. A plataforma facilita a consulta a indicadores e apoia pesquisas, diagnósticos e o planejamento de políticas públicas.",
    image: "/redesign/projeto-data-nordeste.jpg",
    banner: "/redesign/banner-data-nordeste.jpg",
    about: [
      "O projeto Data Nordeste tem como objetivo desenvolver uma plataforma que reúne dados socioeconômicos, ambientais e territoriais para apoiar o planejamento e as políticas públicas de desenvolvimento regional. A iniciativa busca facilitar o acesso a informações de diferentes fontes oficiais sobre os municípios do Nordeste, do Semiárido, da Caatinga e da área de atuação da Sudene.",
      "Desenvolvido em cocriação pelo OCA/UFCG e pela Superintendência do Desenvolvimento do Nordeste (Sudene), o projeto contempla a organização e o tratamento de bases de dados, a construção de painéis interativos e narrativas de dados e a geração de relatórios personalizados sobre os territórios e temas selecionados pelos usuários.",
      "O OCA lidera o desenvolvimento técnico-científico, incluindo a estruturação da plataforma e a curadoria das informações. O trabalho também envolve a avaliação da experiência dos usuários, o aprimoramento das ferramentas e a capacitação da equipe da Sudene para atualização dos conteúdos e gestão da plataforma.",
      "Voltado a gestores públicos, pesquisadores e sociedade, o projeto busca fortalecer a capacidade de produzir diagnósticos, planejar ações e acompanhar políticas públicas, contribuindo para decisões fundamentadas em evidências.",
    ],
    others: ["cisternas", "floresta-em-pe", "sedes"],
    platform: {
      name: "Data Nordeste",
      title: "Conheça o Data Nordeste",
      url: "https://datanordeste.sudene.gov.br",
      logo: "/redesign/logo-data-nordeste.png",
      screenshot: "/redesign/plataforma-data-nordeste.jpg",
      intro:
        "Conheça o Data Nordeste, plataforma desenvolvida no âmbito do projeto.",
      summary:
        "Uma plataforma que reúne dados de fontes oficiais sobre o Nordeste, o Semiárido, a Caatinga e a área de atuação da Sudene. Explore informações sobre população, economia, educação, saúde, meio ambiente e outros temas para apoiar pesquisas, planejamento e políticas públicas.",
      about: [
        "O Data Nordeste é uma plataforma que reúne dados estratégicos sobre todos os municípios que integram a região Nordeste, o Semiárido, a Caatinga e a área de atuação da Sudene. Ao centralizar informações provenientes de fontes oficiais, a plataforma amplia o acesso ao conhecimento sobre esses territórios e apoia pesquisas, diagnósticos, planejamento territorial, formulação de políticas públicas e tomada de decisão.",
        "A plataforma disponibiliza informações sobre demografia, saúde, educação, economia, infraestrutura e saneamento, desenvolvimento social, segurança hídrica, meio ambiente, entre outros temas.",
        "Esses conteúdos são apresentados principalmente por meio de painéis interativos, boletins e narrativas de dados. Os painéis permitem explorar indicadores, acompanhar sua evolução ao longo do tempo e comparar estados, municípios e outros recortes territoriais. Os boletins sintetizam informações relevantes, enquanto as narrativas articulam dados, contextos e interpretações para facilitar a compreensão das dinâmicas regionais.",
        "Entre as principais ferramentas da plataforma está a geração de relatórios municipais personalizados. A partir da seleção de um município e dos temas de seu interesse, o usuário tem acesso, em um único documento, a um panorama do território escolhido. Esse relatório é elaborado automaticamente a partir do conjunto de dados disponíveis no Data Nordeste para o município, considerando os temas escolhidos.",
        "Além de consultar as informações na plataforma, os usuários podem baixar os dados disponíveis para utilizá-los em suas próprias análises, pesquisas e atividades de planejamento.",
        "Desenvolvido pelo OCA/UFCG em cocriação com a Sudene, o Data Nordeste amplia o acesso a informações estratégicas sobre os municípios e territórios da região, contribuindo para a produção de conhecimento, o planejamento e a tomada de decisão baseada em evidências.",
      ],
      cta: "Acesse a plataforma e conheça mais.",
    },
  },
  {
    slug: "sedes",
    name: "Sistema Estratégico sobre Desertificação e Seca",
    title: "SEDES",
    short: "SEDES",
    status: "Em andamento",
    period: "2025 – atualmente",
    partners: ["MMA"],
    summary:
      "O SEDES reúne dados sobre seca, cobertura vegetal e degradação da terra no Brasil. Com os módulos de Monitoramento, Comunicação e Priorização, a plataforma permite acompanhar indicadores, gerar relatórios territoriais e identificar áreas prioritárias para intervenção.",
    image: "/redesign/projeto-sedes.jpg",
    banner: "/redesign/banner-sedes.jpg",
    about: [
      "O projeto SEDES estrutura o desenvolvimento de um sistema público de informações para apoiar a implementação da Política Nacional de Combate à Desertificação e Mitigação dos Efeitos da Seca. Seu propósito é oferecer uma base técnica para identificar prioridades territoriais e orientar ações relacionadas à desertificação, à degradação da terra e à seca no Brasil.",
      "A iniciativa é conduzida pelo Ministério do Meio Ambiente e Mudança do Clima (MMA), por meio do Departamento de Combate à Desertificação e Mitigação dos Efeitos da Seca (DCDE), com desenvolvimento técnico-científico e tecnológico do OCA/UFCG. Sua construção envolve um grupo de trabalho interinstitucional que contribui para discutir critérios, definir prioridades e orientar as soluções às necessidades da gestão pública.",
      "O trabalho compreende a integração de bases oficiais produzidas por diferentes instituições, a estruturação de indicadores e a implementação de métodos de análise multicritério para priorização territorial. Essas atividades sustentam o desenvolvimento dos módulos de Monitoramento, Priorização e Comunicação, incluindo a geração de relatórios personalizados.",
      "A articulação entre as instituições busca estabelecer referências compartilhadas para a análise dos territórios e ampliar o uso das evidências no planejamento público. Como resultado, o projeto pretende consolidar uma infraestrutura de informações que apoie diagnósticos e decisões sobre onde e como direcionar ações de enfrentamento desses desafios.",
    ],
    others: ["cisternas", "floresta-em-pe", "atlas"],
    platform: {
      name: "SEDES",
      title: "Conheça o SEDES",
      url: "https://sedes.oca-portal.com",
      logo: "/redesign/logo-sedes.png",
      screenshot: "/redesign/plataforma-sedes.jpg",
      intro: "Conheça o SEDES, plataforma desenvolvida no âmbito do projeto.",
      summary:
        "Plataforma digital que reúne dados sobre secas, cobertura vegetal, degradação da terra e desertificação para todos os municípios brasileiros.",
      about: [
        "O Sistema Estratégico sobre Desertificação e Seca (SEDES) é uma plataforma que reúne dados e ferramentas para apoiar o monitoramento da desertificação, da degradação da terra e dos efeitos da seca no Brasil. Ao facilitar o acesso a informações oficiais e a produção de análises, oferece subsídios para o planejamento territorial, a formulação de políticas públicas e a tomada de decisão.",
        "A plataforma está organizada em três frentes: Monitoramento, Priorização e Comunicação. No Monitoramento, o usuário pode consultar informações sobre clima, seca, vegetação, uso e cobertura da terra, carbono no solo, degradação e condições socioeconômicas, permitindo compreender as condições dos territórios e acompanhar mudanças ao longo do tempo.",
        "Na Priorização, é possível combinar critérios, definir a importância de cada um e comparar municípios. Os resultados são apresentados em mapas, permitindo identificar áreas prioritárias conforme os parâmetros escolhidos, testar diferentes cenários e apoiar a definição de ações públicas. Na Comunicação, o usuário pode gerar relatórios municipais personalizados, selecionando os temas de interesse e reunindo as informações em um único documento disponível em PDF.",
        "Os dados podem ser consultados em diferentes recortes territoriais, conforme a disponibilidade de cada indicador: Brasil, regiões, estados, municípios, Semiárido, Áreas Suscetíveis à Desertificação e seus entornos, além dos biomas brasileiros. Cada módulo informa as fontes e os períodos disponíveis para consulta.",
        "Uma iniciativa do Ministério do Meio Ambiente e Mudança do Clima (MMA), desenvolvida pelo OCA/UFCG, o SEDES incorpora contribuições de instituições que produzem e utilizam dados sobre essas temáticas, aproximando suas ferramentas das necessidades de quem atua na compreensão e na gestão dos territórios.",
      ],
      cta: "Explore a plataforma.",
    },
  },
  {
    slug: "atlas",
    name: "Atlas de Áreas Suscetíveis à Desertificação",
    title: "Atlas das Áreas Suscetíveis à Desertificação no Brasil",
    short: "Atlas (ASDs)",
    status: "Em andamento",
    period: "2026 – atualmente",
    partners: ["MMA", "FAO"],
    summary:
      "O Atlas reúne mapas e análises sobre as Áreas Suscetíveis à Desertificação no Brasil. Ao apresentar informações sobre clima, solos, biodiversidade e população, a publicação ajuda a compreender as condições desses territórios e a orientar ações de enfrentamento à desertificação.",
    image: "/redesign/projeto-atlas.jpg",
    banner: "/redesign/banner-atlas.jpg",
    about: [
      "O projeto tem como objetivo atualizar o Atlas das Áreas Suscetíveis à Desertificação no Brasil, publicado originalmente em 2007, incorporando novos dados e avanços metodológicos para compreender as transformações ambientais, climáticas e socioeconômicas desses territórios. A proposta busca oferecer uma base de referência para o planejamento territorial e a formulação de políticas públicas.",
      "Coordenado pelo OCA/UFCG, o trabalho integra a cooperação técnica com a Organização das Nações Unidas para a Alimentação e a Agricultura (FAO), no âmbito do projeto TCP/BRA/4001, em articulação com o Ministério do Meio Ambiente e Mudança do Clima (MMA).",
      "O desenvolvimento envolve levantamento e sistematização de dados, produção cartográfica e análises comparativas com a edição de 2007. Contempla a atualização da delimitação das áreas suscetíveis à desertificação, conforme as referências técnicas do INPE/Cemaden e do MMA, e a análise de suas condições ambientais e socioeconômicas. Também considera a presença de povos e comunidades tradicionais, suas vulnerabilidades e as contribuições de seus conhecimentos e práticas para a convivência com o Semiárido.",
      "Entre os produtos previstos estão o relatório metodológico, os relatórios temáticos, as bases de dados e o Atlas consolidado em português e inglês, nos formatos digital e impresso. Uma plataforma de acesso público disponibilizará as informações produzidas, ampliando seu uso em pesquisas, diagnósticos e ações de enfrentamento da desertificação.",
    ],
    others: ["floresta-em-pe", "data-nordeste", "sedes"],
    platform: {
      name: "Atlas (ASDs)",
      title: "Conheça o Atlas das ASDs",
      logo: "/redesign/logo-atlas.png",
      screenshot: "/redesign/plataforma-atlas.jpg",
      intro: "Conheça a plataforma desenvolvida no âmbito do projeto.",
      summary:
        "Publicação técnico-científica que sistematiza mapas, análises e informações sobre as Áreas Suscetíveis à Desertificação (ASDs) no Brasil, subsidiando políticas públicas e processos decisórios.",
      about: [
        "O Atlas das Áreas Suscetíveis à Desertificação apresenta dados ambientais e socioeconômicos sobre as áreas suscetíveis à desertificação no Brasil. Ao organizar informações sobre esses territórios, amplia o acesso ao conhecimento e apoia pesquisas, diagnósticos, planejamento territorial e formulação de políticas públicas.",
        "A proposta é oferecer uma visão integrada das condições ambientais e sociais dessas áreas, contribuindo para compreender as relações entre a degradação da terra, as secas e as condições de vida das populações. Essa abordagem permite considerar tanto as características dos ecossistemas quanto as dinâmicas sociais e econômicas dos territórios.",
        "Sua construção envolve o diálogo com instituições, organizações e movimentos sociais, aproximando o conhecimento científico das experiências e necessidades locais. Esse processo participativo contribui para identificar informações relevantes e orientar a organização dos conteúdos, considerando diferentes perspectivas sobre os desafios enfrentados nessas áreas.",
        "Desenvolvido pelo OCA/UFCG, em parceria com o Ministério do Meio Ambiente e Mudança do Clima (MMA) e a Organização das Nações Unidas para a Alimentação e a Agricultura (FAO), o Atlas busca oferecer uma base de conhecimento para orientar ações de prevenção e enfrentamento da desertificação, conservação dos ecossistemas e melhoria das condições de vida das populações.",
      ],
      cta: "Conheça o Atlas e saiba mais sobre esses territórios.",
    },
  },
  {
    slug: "pab-brasil",
    name: "PAB-Brasil",
    status: "Concluído",
    partners: ["MMA"],
    summary:
      "O projeto contribuiu para a elaboração do Plano de Ação Brasileiro de Combate à Desertificação e Mitigação dos Efeitos da Seca (PAB-Brasil). Construído com a participação de diferentes setores da sociedade, o plano orienta ações de enfrentamento à desertificação e de redução dos impactos da seca.",
    image: "/redesign/projeto-pab-brasil.jpg",
    banner: "/redesign/banner-pab-brasil.jpg",
    about: [
      "O Plano de Ação Brasileiro de Combate à Desertificação e Mitigação dos Efeitos da Seca (PAB-Brasil) orienta políticas e ações para enfrentar a desertificação, a degradação da terra e os efeitos da seca no país.",
      "Na construção do 2º PAB-Brasil, o OCA foi responsável pela organização da base de dados do diagnóstico climático, ambiental, demográfico e socioeconômico e pela coordenação técnico-científica do processo participativo, junto ao Departamento de Combate à Desertificação e Mitigação dos Efeitos da Seca do Ministério do Meio Ambiente e Mudança do Clima (DCDE/MMA).",
      "O diagnóstico reuniu informações para compreender as condições dos territórios e apoiar a definição de prioridades. Sua discussão envolveu dez seminários estaduais, quatro regionais e um nacional, nos quais instituições públicas, pesquisadores, comunidades e organizações sociais contribuíram para a validação dos mapas e a construção das propostas.",
      "O plano articula 27 instituições e contempla 38 objetivos estratégicos, 186 ações e 152 indicadores de acompanhamento. Ao conectar evidências científicas, conhecimentos locais e participação social, o trabalho oferece subsídios para orientar a atuação pública e acompanhar os avanços no enfrentamento da desertificação e dos efeitos da seca.",
    ],
    others: ["floresta-em-pe", "data-nordeste", "sedes"],
  },
  {
    slug: "floresta-em-pe",
    name: "Projeto Floresta em Pé, Renda Justa",
    short: "Caativar",
    status: "Em andamento",
    partners: ["Sudene"],
    summary:
      "O projeto estrutura e disponibiliza informações sobre o mercado de carbono na Caatinga por meio da plataforma Caativar. A iniciativa busca apoiar decisões sobre projetos de carbono que conciliem a conservação da vegetação nativa e a geração de renda nos territórios.",
    image: "/redesign/projeto-floresta-em-pe.jpg",
    banner: "/redesign/banner-floresta-em-pe.jpg",
    about: [
      "O projeto Floresta em Pé, Renda Justa tem como objetivo desenvolver uma iniciativa para apoiar a quantificação, o monitoramento e a certificação de créditos de carbono na Caatinga, articulando pesquisa científica, tecnologia e governança participativa. A proposta busca produzir informações e instrumentos que contribuam para a conservação e a restauração da vegetação nativa, considerando a inclusão socioeconômica de agricultores familiares, povos indígenas, comunidades quilombolas e assentados.",
      "Seu escopo contempla a implementação de modelos para estimar os estoques de carbono na biomassa aérea, nas raízes e no solo, calibrados com dados de campo e sensoriamento remoto.",
      "O trabalho prevê combinar imagens de satélite e registros comunitários para acompanhar mudanças na cobertura vegetal e nos estoques de carbono, com validação em áreas demonstrativas.",
      "O desenvolvimento tecnológico inclui a estruturação de bancos de dados, mecanismos de cadastro auditável de áreas e ferramentas de Monitoramento, Relato e Verificação (MRV). Essas etapas buscam assegurar a rastreabilidade das informações e oferecer suporte técnico aos processos de verificação e certificação, considerando os requisitos das certificadoras e as relações entre comunidades e compradores de créditos.",
      "A participação das comunidades integra o desenvolvimento e a validação do projeto. Estão previstas oficinas de capacitação, materiais de orientação, testes de usabilidade e a construção de um modelo de governança com representação comunitária e das instituições parceiras. As contribuições obtidas nessas atividades devem orientar o aprimoramento das soluções desenvolvidas.",
      "Entre os produtos previstos estão o protótipo e a versão operacional da plataforma, modelos de estimativa de carbono, relatórios de monitoramento e avaliação e ações de formação. O projeto busca ampliar a capacidade técnica para avaliar iniciativas de carbono na Caatinga e subsidiar políticas públicas relacionadas à conservação, ao enfrentamento da desertificação e às mudanças climáticas.",
      "Desenvolvido pelo OCA/UFCG, com financiamento da Superintendência do Desenvolvimento do Nordeste (Sudene), o projeto deu origem à Caativar — Caatinga: Valorização, Autonomia e Renda.",
    ],
    others: ["pab-brasil", "data-nordeste", "sedes"],
    platform: {
      name: "Caativar",
      title: "Conheça a Caativar",
      logo: "/redesign/logo-caativar.png",
      screenshot: "/redesign/plataforma-caativar.jpg",
      intro:
        "Conheça a Caativar, plataforma desenvolvida no âmbito do projeto.",
      summary:
        "A Plataforma Caativar (Caatinga: Valorização, Autonomia e Renda) é uma iniciativa que disponibiliza dados, mapas e conhecimentos sobre os territórios da Caatinga, com foco na compreensão do mercado de carbono e de suas relações com o bioma",
      about: [
        "A Caativar (Caatinga: Valorização, Autonomia e Renda) é uma plataforma que disponibiliza dados, mapas e conhecimentos sobre os territórios da Caatinga, com foco na compreensão do mercado de carbono e de suas relações com o bioma. Ao aproximar informações científicas, características territoriais e direitos das comunidades, a plataforma oferece subsídios para que comunidades, gestores públicos, pesquisadores e investidores avaliem oportunidades, reconheçam riscos e participem de decisões informadas.",
        "A plataforma apresenta informações ambientais e socioeconômicas que ajudam a compreender as condições dos territórios e sua relação com o desenvolvimento de projetos de carbono.",
        "Também disponibiliza conteúdos sobre o funcionamento desse mercado, os direitos das populações, as formas de financiamento, a mensuração do carbono e as possibilidades de desenvolvimento territorial.",
        "Esses conteúdos são apresentados por meio de mapas, resumos territoriais, cartilha e cadernos temáticos. Os mapas permitem explorar informações sobre a Caatinga e seus territórios, enquanto os materiais explicativos articulam conceitos, contextos e orientações para facilitar a compreensão do tema e de suas implicações para quem vive e produz no bioma.",
        "Entre as principais ferramentas da plataforma está a consulta ao resumo territorial. A partir da seleção de um território, o usuário tem acesso a um panorama de suas características ambientais e socioeconômicas, incluindo estimativas relacionadas ao carbono. Essas informações oferecem uma base inicial para compreender as particularidades locais e apoiar análises.",
        "A plataforma também disponibiliza informações sobre eventos e espaços de diálogo com instituições, organizações e movimentos sociais. Essas atividades aproximam o conhecimento técnico das experiências e necessidades locais, contribuindo para a construção de uma agenda sobre o mercado de carbono que considere os direitos, os modos de vida e a participação das comunidades.",
        "Desenvolvida pelo OCA/UFCG, com financiamento da Sudene, a Caativar busca tornar o conhecimento sobre o mercado de carbono acessível e útil para quem vive na Caatinga, oferecendo elementos para avaliar projetos, negociar em condições mais justas e participar das decisões que podem afetar os territórios.",
      ],
      cta: "Acesse a plataforma e conheça mais.",
    },
  },
  {
    slug: "pae-pe",
    name: "PAE-PE 2026–2046",
    status: "Concluído",
    partners: ["SEMAS-PE"],
    summary:
      "O PAE-PE 2026–2046 orienta o planejamento e as ações de Pernambuco no combate à desertificação e aos efeitos da seca, com horizonte de 20 anos.",
    image: "/redesign/projeto-pae-pe.jpg",
    banner: "/redesign/banner-pae-pe.jpg",
    about: [
      "O Plano de Ação Estadual de Combate à Desertificação e Mitigação dos Efeitos da Seca de Pernambuco (PAE-PE 2026–2046) orienta o planejamento e a atuação do estado no enfrentamento desses desafios, com horizonte de 20 anos.",
      "O OCA conduziu o diagnóstico e a metodologia de atualização participativa do plano, em articulação com a Secretaria de Meio Ambiente, Sustentabilidade e de Fernando de Noronha de Pernambuco (SEMAS-PE), o MMA, a Sudene e a Articulação Semiárido Brasileiro (ASA).",
      "O trabalho contempla indicadores de degradação da terra, seca e vulnerabilidade social nos municípios pernambucanos. Essas informações apoiam a compreensão das diferenças entre os territórios e a identificação de áreas e populações que demandam atenção nas políticas públicas.",
      "A construção participativa envolve gestores estaduais e municipais, universidades e organizações sociais, aproximando os diagnósticos das experiências e necessidades locais. O plano organiza objetivos, metas e indicadores de acompanhamento, além de materiais de orientação para gestores e secretarias.",
      "Com essa contribuição, o OCA apoia o planejamento de ações e a construção de instrumentos para acompanhar sua implementação, fortalecendo a articulação entre conhecimento científico, participação social e gestão pública.",
    ],
    others: ["floresta-em-pe", "data-nordeste", "atlas"],
  },
  {
    slug: "cisternas",
    name: "Projeto Cisternas",
    short: "Cisternas",
    status: "Em andamento",
    period: "2025 – atualmente",
    partners: ["Sudene"],
    summary:
      "Monitoramento participativo da água armazenada em cisternas no Semiárido brasileiro, integrando pesquisa, tecnologia e conhecimento local para apoiar a segurança hídrica e a construção de políticas públicas.",
    image: "/redesign/projeto-cisternas.jpg",
    banner: "/redesign/banner-cisternas.jpg",
    about: [
      "O projeto Fortalecendo Políticas de Combate à Desertificação Baseadas em Evidências por Meio do Engajamento Local e do Conhecimento Tradicional no Semiárido Brasileiro desenvolve o monitoramento participativo da água armazenada em cisternas em cinco municípios de Pernambuco e da Paraíba. A iniciativa combina pesquisa, tecnologia e participação comunitária para produzir informações que apoiem a compreensão da disponibilidade de água e sua gestão nos territórios.",
      "O trabalho envolve jovens das comunidades, formados para atuar como pesquisadores locais. Sua participação contribui para acompanhar as cisternas e produzir dados a partir das experiências de quem utiliza esses reservatórios no cotidiano.",
      "Ao aproximar instrumentos de monitoramento e conhecimentos locais, o projeto busca compreender as condições de armazenamento e uso da água, considerando as particularidades das comunidades e suas estratégias de convivência com o Semiárido.",
      "Desenvolvido pelo OCA/UFCG, com financiamento da Sudene e colaboração de instituições e organizações parceiras, o projeto também fortalece o envolvimento das juventudes na pesquisa e na discussão dos desafios de seus territórios.",
      "Os conhecimentos produzidos buscam apoiar ações de segurança hídrica e oferecer subsídios para políticas públicas mais adequadas às necessidades das populações.",
    ],
    gallery: [
      "/redesign/cisternas-1.jpg",
      "/redesign/cisternas-2.jpg",
      "/redesign/cisternas-3.jpg",
      "/redesign/cisternas-4.jpg",
      "/redesign/cisternas-5.jpg",
    ],
    others: ["floresta-em-pe", "data-nordeste", "pab-brasil"],
  },
];

const bySlug = (slugs: string[]) =>
  slugs.map((slug) => PROJECTS.find((p) => p.slug === slug)!);

// Seções da Home, na ordem do design.
export const HOME_PROJECTS = bySlug([
  "pab-brasil",
  "cisternas",
  "floresta-em-pe",
  "pae-pe",
]);
export const PLATFORM_PROJECTS = bySlug([
  "sedes",
  "data-nordeste",
  "atlas",
  "floresta-em-pe",
]);
