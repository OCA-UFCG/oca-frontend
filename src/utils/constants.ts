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
    name: "Desgração do solo",
    imageId: "projects/ee-abraao-oca/assets/Index_Degradacao",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1RZj8iOP4k94mLqXnm6_apH1yKNfVrqHS",
    description: "Trabalho em construção",
  },
  aridez: {
    id: "aridez",
    name: "Índice de aridez solo",
    imageId: "projects/ee-abraao-oca/assets/Index_Degradacao",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
    description: "Trabalho em construção",
  },

  gpp: {
    id: "gpp",
    name: "GPP",
    imageId: "projects/ee-abraao-oca/assets/Index_Degradacao",
    posterUrl:
      "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
    description: "Trabalho em construção",
  },
};

export const defaultEEInfo: IEEInfo = {
  id: "default",
  name: "--",
  imageId: "",
  posterUrl: "/defaultMapsPoster.png",
  description: "--",
};
