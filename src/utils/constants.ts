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
    description: "???????",
  },
  gpp_21: {
    name: "gpp_21",
    imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
    description: "???????",
  },
  aridez_75: {
    name: "aridez_75",
    imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
    description: "???????",
  },
  cf_85: {
    name: "cf_85",
    imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_1985_br",
    description: "???????",
  },
  cf_22: {
    name: "cf_22",
    imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_2022_br",
    description: "???????",
  },
  spei_12: {
    name: "spei_12",
    imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
    description: "???????",
  },
  carbono: {
    name: "carbono",
    imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
    description: "???????",
  },
};
