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
  // aridez: {
  //   id: "aridez",
  //   name: "Índice de Aridez",
  //   description:
  //     "O Índice de Aridez fornece uma medida concisa da relação entre precipitação e evaporação potencial em uma região específica. Essa métrica é fundamental para compreender o balanço hídrico e orientar decisões em recursos hídricos, agricultura e gestão ambiental. Índice inferior a 0,65 indica Área Suscetível à Desertificação (ASD).",
  //   imageData: {
  //     "2004": {
  //       default: true,
  //       imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
  //       imageParams: ["#d7191b", "#fe7f00", "#c6e8ac", "#2c83b9"],
  //     },
  //     "2020": {
  //       default: false,
  //       imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1990_2020_cemaden",
  //       imageParams: ["#d7191b", "#fe7f00", "#c6e8ac", "#2c83b9"],
  //     }
  //   },
  //   posterUrl:
  //     "https://drive.google.com/uc?export=view&id=1a9t9OJLs0H9cP4yKJWx5Zw5pQ5QJj2L3", // TODO update
  //   minScale: 2,
  //   maxScale: 5,
  // },

  spei: {
    id: "spei",
    name: "Índice de Seca",
    description:
      "O índice seca disponibilizado nesta plataforma refere-se a frequência de ocorrência de seca longa (12 meses) severa (<-1.3) para o SPEI (Standardized Precipitation Evapotranspiration Index).",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
        imageParams: [
          { color: "#53a7d4", label: "" },
          { color: "#f3d7cb", label: "" },
          { color: "#f38657", label: "" },
          { color: "#ca0020", label: "" },
        ],
      },
    },
    measurementUnit: "classes",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=18Wj_V5UQpX4ttfwyjW7vsne2uucPZSGd",
    minScale: 0.2,
    maxScale: 32.25,
  },

  // cf: {
  //   id: "cf",
  //   name: "Vegetação Nativa",
  //   description:
  //     "Indica as áreas que atualmente possuem vegetação nativa, além de fornecer informações sobre o período em que a vegetação foi removida em locais onde não há mais vegetação nativa presente.",
  //   imageData: {
  //     "1985": {
  //       default: true,
  //       imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_1985_br",
  //       imageParams: ["#ffffff", "#e31a96"],
  //     },
  //     "2022": {
  //       default: false,
  //       imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_2022_br",
  //       imageParams: ["#ffffff", "#005924"],
  //     },
  //   },
  //   posterUrl:
  //     "https://drive.google.com/uc?export=view&id=1a9t9OJLs0H9cP4yKJWx5Zw5pQ5QJj2L3", // TODO update
  //   minScale: 0,
  //   maxScale: 1,
  // },

  gpp: {
    id: "gpp",
    name: "Produtividade Primária Bruta",
    description:
      "Refere-se ao total de carbono fixado pela vegetação através da fotossíntese. Quanto maior a GPP, mais ativa é a fotossíntese da vegetação, resultando em maior biomassa, incluindo troncos, galhos e folhas, e maior absorção de carbono da atmosfera.",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
        imageParams: [
          { color: "#a50d00", label: "" },
          { color: "#fd9649", label: "" },
          { color: "#fedf99", label: "" },
          { color: "#12f007", label: "" },
          { color: "#125b07", label: "" },
          { color: "#202f1c", label: "" },
        ],
      },
    },
    measurementUnit: "g/kg",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=12vNg-j5-jSQwiZVsIJAcpb-8UEf3szvQ",
    minScale: 0.85,
    maxScale: 4.2,
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
    measurementUnit: "classes",
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
          { color: "#a50d00", label: "" },
          { color: "#fd9649", label: "" },
          { color: "#fedf99", label: "" },
          { color: "#12f007", label: "" },
          { color: "#125b07", label: "" },
          { color: "#202f1c", label: "" },
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
