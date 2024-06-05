import { IEEImage, IEEInfo, ISection } from "./interfaces";

export const sections: ISection[] = [
  {
    name: "Sobre nós",
    href: "/",
  },
  {
    name: "Nossa história",
    href: "/about",
  },
  {
    name: "Publicações",
    href: "/#publications",
  },
  {
    name: "Mapas e Visualizações",
    href: "/#maps-visu",
  },
  {
    name: "Parceiros",
    href: "/#sponsors",
  },
  {
    name: "Nossa Equipe",
    href: "/#teamMembers",
  },
];

export const EEImages: IEEImage = {
  aridez: {
    id: "aridez",
    name: "Índice de Aridez",
    description:
      "O Índice de Aridez fornece uma medida concisa da relação entre precipitação e evaporação potencial em uma região específica. Essa métrica é fundamental para compreender o balanço hídrico e orientar decisões em recursos hídricos, agricultura e gestão ambiental. Índice inferior a 0,65 indica Área Suscetível à Desertificação (ASD).",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1a9t9OJLs0H9cP4yKJWx5Zw5pQ5QJj2L3", // TODO update
    minScale: 2,
    maxScale: 5,
    measurementUnit: "classes",
    imageData: {
      "2004": {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
        imageParams: [
          { color: "#d7191b", label: "Árido" },
          { color: "#fe7f00", label: "Semiárido" },
          { color: "#c6e8ac", label: "Subúmido seco" },
          { color: "#2c83b9", label: "Úmido" },
        ],
      },
      "2020": {
        default: false,
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1990_2020_cemaden",
        imageParams: [
          { color: "#d7191b", label: "Árido" },
          { color: "#fe7f00", label: "Semiárido" },
          { color: "#c6e8ac", label: "Subúmido seco" },
          { color: "#2c83b9", label: "Úmido" },
        ],
      },
    },
  },

  spei: {
    id: "spei",
    name: "Índice de Seca",
    description:
      "O índice seca disponibilizado nesta plataforma refere-se a frequência de ocorrência de seca longa (12 meses) severa (<-1.3) para o SPEI (Standardized Precipitation Evapotranspiration Index).",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=18Wj_V5UQpX4ttfwyjW7vsne2uucPZSGd",
    minScale: 1,
    maxScale: 5,
    measurementUnit: "%",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
        imageParams: [
          { color: "#045f93", pixelLimit: 5, label: "<= 5" },
          { color: "#53a7d4", pixelLimit: 10, label: "5 - 10" },
          { color: "#f3d7cb", pixelLimit: 15, label: "10 - 15" },
          { color: "#f38657", pixelLimit: 20, label: "15 - 20" },
          { color: "#ca0020", label: "> 20" },
        ],
      },
    },
  },

  cf: {
    id: "cf",
    name: "Vegetação Nativa",
    description:
      "Indica as áreas que atualmente possuem vegetação nativa, além de fornecer informações sobre o período em que a vegetação foi removida em locais onde não há mais vegetação nativa presente.",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1a9t9OJLs0H9cP4yKJWx5Zw5pQ5QJj2L3", // TODO update
    minScale: 0,
    maxScale: 3,
    measurementUnit: "classes",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_2022_1985_br_end",
        imageParams: [
          { color: "#ffffff", label: "Não floresta" },
          { color: "#e31a96", label: "Supressão Florestal" },
          { color: "#005924", label: "Formação Florestal" },
        ],
      },
    },
  },

  gpp: {
    id: "gpp",
    name: "Produtividade Primária Bruta",
    description:
      "Refere-se ao total de carbono fixado pela vegetação através da fotossíntese. Quanto maior a GPP, mais ativa é a fotossíntese da vegetação, resultando em maior biomassa, incluindo troncos, galhos e folhas, e maior absorção de carbono da atmosfera.",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=12vNg-j5-jSQwiZVsIJAcpb-8UEf3szvQ",
    minScale: 0.7,
    maxScale: 4.2,
    measurementUnit: "g/kg",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
        imageParams: [
          { color: "#a50d00", pixelLimit: 0.7, label: "<= 0.7" },
          { color: "#fd9649", pixelLimit: 1.3, label: "0.7 - 1.3" },
          { color: "#fedf99", pixelLimit: 1.8, label: "1.3 - 1.8" },
          { color: "#12f007", pixelLimit: 2.4, label: "1.8 - 2.4" },
          { color: "#125b07", pixelLimit: 2.9, label: "2.4 - 2.9" },
          { color: "#202f1c", label: ">2.9" },
        ],
      },
    },
  },

  carbono: {
    id: "carbono",
    name: "Carbono Orgânico do Solo",
    description:
      "Refere-se à quantidade de carbono presente na matéria orgânica do solo. Este carbono desempenha um papel crucial na saúde do solo, influenciando diretamente sua estrutura. Ele contribui para evitar a compactação do solo e melhora a retenção de nutrientes e água. Solos com baixos níveis de carbono orgânico tendem a perder fertilidade ao longo do tempo.",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
        imageParams: [
          { color: "#a50d00", pixelLimit: 5, label: "< 5" },
          { color: "#fd9649", pixelLimit: 6, label: "5 - 8" },
          { color: "#fedf99", pixelLimit: 8, label: "6 - 8" },
          { color: "#12f007", pixelLimit: 10, label: "8 - 10" },
          { color: "#125b07", pixelLimit: 16, label: "10 - 16" },
          { color: "#202f1c", label: "> 16" },
        ],
      },
    },
    extraInfo: ["Base de dados: MODIS (Terra | Aqua)", "Período: 2021"],
    measurementUnit: "g/kg",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=11hNFuxDETLN-nqnMo9E-2_fivvrsmd4g", // TODO update
    minScale: 1,
    maxScale: 6,
  },

  degradacao: {
    id: "degradacao",
    name: "Degradação do Solo",
    description:
      "Refere-se ao estado resultante da remoção da vegetação nativa, perda de produtividade primária e redução dos níveis de carbono orgânico no solo. As áreas com degradação crítica e severa não são capazes de sustentar o crescimento vegetativo sem intervenção, enquanto a degradação moderada indica áreas que requerem atenção especial.",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Index_Degradacao",
        imageParams: [
          { color: "#a50d00", label: "Crítico" },
          { color: "#fd9649", label: "Severo" },
          { color: "#fedf99", label: "Moderado" },
          { color: "#12f007", label: "Bom" },
          { color: "#125b07", label: "Ótimo" },
          { color: "#202f1c", label: "Excelente" },
        ],
      },
    },
    measurementUnit: "classes",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1e0b3_oasG0EGx5eoLgqAtMVpbWsOWgAB",
    minScale: 1,
    maxScale: 6,
  },
};

export const defaultEEInfo: IEEInfo = {
  id: "default",
  name: "--",
  description: "--",
  imageData: {
    general: {
      default: true,
      imageId: "",
      imageParams: [
        { color: "#white", label: "" },
        { color: "#black", label: "" },
      ],
    },
  },
  measurementUnit: "classes",
  posterUrl: "/defaultMapsPoster.png",
  minScale: 0,
  maxScale: 1,
};
