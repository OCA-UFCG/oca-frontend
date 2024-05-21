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
    imageData: {
      "2004": {
        default: true,
        imageId: "projects/ee-abraao-oca/assets/Index_Aridez",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
      "2020": {
        imageId: "projects/ee-abraao-oca/assets/Index_Aridez",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
    },
    description:
      "O Índice de Aridez é uma medida que nos ajuda a entender a disponibilidade hídrica em uma região, ao considerar a relação entre a precipitação e a evapotranspiração potencial. Quando a precipitação é menor do que a evapotranspiração o resultado é um Índice de Aridez baixo, o que indica condições mais áridas, caracterizadas por uma disponibilidade limitada de água. Quanto menor o Índice de Aridez de um lugar, mais suscetível esse estará ao processo de desertificação. A importância do Índice de Aridez reside no fato que o processo de desertificação só ocorre em áreas caracterizadas como áridas, semiáridas e subúmidas, onde o Índice de Aridez é inferior a 0,65. Essas áreas são denominadas como Áreas Suscetíveis à Desertificação (ASD).",
  },
  degradacao: {
    id: "degradacao",
    name: "Desgração do solo",
    imageData: {
      general: {
        default: true,
        imageId: "projects/ee-abraao-oca/assets/Index_Degradacao",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1RZj8iOP4k94mLqXnm6_apH1yKNfVrqHS",
      },
    },
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
