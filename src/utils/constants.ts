import { IEEImage, ISection } from "./interfaces";

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
  degradacao: {
    name: "degradacao",
    imageId: "projects/ee-ocaufcg/assets/Index_Degradacao",
    description: "Mapa de degradação",
  },
  gpp_21: {
    name: "gpp_21",
    imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
    description: "Mapa de GPP no Brasil em 2021",
  },
};
