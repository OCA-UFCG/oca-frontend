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
  degradacao: {
    id: "degradacao",
    name: "Indicie de Degradação",
    imageId: "projects/ee-ocaufcg/assets/Index_Degradacao",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1RZj8iOP4k94mLqXnm6_apH1yKNfVrqHS",
    description: "???????",
  },
  gpp_21: {
    id: "gpp_21",
    name: "???????",
    imageId: "projects/ee-ocaufcg/assets/GPP_MODIS_Brasil_2021",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
    description: "???????",
  },
  aridez_75: {
    id: "aridez_75",
    name: "Indice de Aridez",
    imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
    description: "???????",
  },
  cf_85: {
    id: "cf_85",
    name: "???????",
    imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_1985_br",
    description: "???????",
  },
  cf_22: {
    id: "cf_22",
    name: "???????",
    imageId: "projects/ee-ocaufcg/assets/Mapbiomas_cf_2022_br",
    description: "???????",
  },
  spei_12: {
    id: "spei_12",
    name: "???????",
    imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
    description: "???????",
  },
  carbono: {
    id: "carbono",
    name:"Indice de Carbono",
    imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
    description: "???????",
  },
};

export const defaultEEInfo: IEEInfo = {
  id: "default",
  name: "--",
  imageId: "",
  posterUrl: "/defaultMapsPoster.png",
  description: "--",
};
