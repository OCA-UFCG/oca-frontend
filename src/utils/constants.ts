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
    href: "/#maps",
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
    name: "Índice de aridez solo",
    description:
      "O Índice de Aridez é uma medida que nos ajuda a entender a disponibilidade hídrica em uma região, ao considerar a relação entre a precipitação e a evapotranspiração potencial. Quando a precipitação é menor do que a evapotranspiração o resultado é um Índice de Aridez baixo, o que indica condições mais áridas, caracterizadas por uma disponibilidade limitada de água. Quanto menor o Índice de Aridez de um lugar, mais suscetível esse estará ao processo de desertificação. A importância do Índice de Aridez reside no fato que o processo de desertificação só ocorre em áreas caracterizadas como áridas, semiáridas e subúmidas, onde o Índice de Aridez é inferior a 0,65. Essas áreas são denominadas como Áreas Suscetíveis à Desertificação (ASD).",
    imageData: {
      "2004": {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
      "2020": {
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1990_2020",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
    },
    minScale: 3,
    maxScale: 5,
    pallete: ["black", "cyan"],
  },
  degradacao: {
    id: "degradacao",
    name: "Desgração do solo",
    description: "Trabalho em construção",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Index_Degradacao",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1RZj8iOP4k94mLqXnm6_apH1yKNfVrqHS",
      },
    },
    minScale: 1,
    maxScale: 6,
    pallete: ["black", "cyan"],
  },
  gpp: {
    id: "gpp",
    name: "GPP",
    description: "Trabalho em construção",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
      },
    },
    minScale: 0.0866,
    maxScale: 4.18055,
    pallete: ["black", "cyan"],
  },
  mapbiomas: {
    id: "mapbiomas",
    name: "mapbiomas",
    description: "Trabalho em construção",
    imageData: {
      "1985": {
        default: true,
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_1985_br",
      },
      "2022": {
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_2022_br",
      },
    },
    minScale: 0,
    maxScale: 1,
    pallete: ["black", "cyan"],
  },
  spei: {
    id: "spei",
    name: "SPEI",
    description: "Trabalho em construção",
    imageData: {
      general: {
        default: true,
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
      },
    },
    minScale: 0.277777,
    maxScale: 32.2222,
    pallete: ["black", "cyan"],
  },
  carbono: {
    id: "carbono",
    name: "carbono",
    description:
      "O carbono orgânico do solo está relacionado com a saúde do solo, pois influencia diretamente na sua estrutura, ajudando a evitar a compactação e melhorando a retenção de nutrientes e água. Solos com baixos níveis de carbono orgânico tendem a perder sua fertilidade ao longo do tempo. A seguir tem-se o mapa de carbono orgânico do solo para o estado da Paraíba, onde se observa os piores valores localizados ao norte da Borborema, estendendo-se em direção ao Sertão Paraibano.",
    imageData: {
      general: {
        default: true,
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
      },
    },
    minScale: 1.92015,
    maxScale: 70.63015,
    pallete: ["black", "cyan"],
  },
};

export const defaultEEInfo: IEEInfo = {
  id: "default",
  name: "--",
  description: "--",
  imageData: {
    general: {
      default: true,
      posterUrl: "/defaultMapsPoster.png",
      imageId: "",
    },
  },
  minScale: 0,
  maxScale: 1,
  pallete: ["black", "white"],
};
