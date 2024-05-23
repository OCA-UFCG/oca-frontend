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
  carbono: {
    id: "carbono",
    name: "carbono",
    description:
      "O carbono orgânico do solo está relacionado com a saúde do solo, pois influencia diretamente na sua estrutura, ajudando a evitar a compactação e melhorando a retenção de nutrientes e água. Solos com baixos níveis de carbono orgânico tendem a perder sua fertilidade ao longo do tempo. A seguir tem-se o mapa de carbono orgânico do solo para o estado da Paraíba, onde se observa os piores valores localizados ao norte da Borborema, estendendo-se em direção ao Sertão Paraibano.",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
      },
    },
    posterUrl:
      "https://drive.google.com/uc?export=view&id=11hNFuxDETLN-nqnMo9E-2_fivvrsmd4g",
    minScale: 1.92015,
    maxScale: 70.63015,
    pallete: ["green", "yellow", "red"],
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
    },
  },
  posterUrl: "/defaultMapsPoster.png",
  minScale: 0,
  maxScale: 1,
  pallete: ["black", "white"],
};
