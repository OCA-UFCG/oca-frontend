"use client";

import MapsMenu from "@/components/MapsMenu/MapsMenu";

const About = () => {
  return (
    <div>
      <MapsMenu
        initialValue="degradacao"
        options={EEImages}
        onSelectChange={(value: string) => console.log(value)}
        onQuestionSelect={(value: string) => console.log(value)}
      />
    </div>
  );
};

export default About;

const EEImages: any = {
  aridez: {
    id: "aridez",
    name: "Índice de aridez solo",
    description:
      "O Índice de Aridez é uma medida que nos ajuda a entender a disponibilidade hídrica em uma região, ao considerar a relação entre a precipitação e a evapotranspiração potencial. Quando a precipitação é menor do que a evapotranspiração o resultado é um Índice de Aridez baixo, o que indica condições mais áridas, caracterizadas por uma disponibilidade limitada de água. Quanto menor o Índice de Aridez de um lugar, mais suscetível esse estará ao processo de desertificação. A importância do Índice de Aridez reside no fato que o processo de desertificação só ocorre em áreas caracterizadas como áridas, semiáridas e subúmidas, onde o Índice de Aridez é inferior a 0,65. Essas áreas são denominadas como Áreas Suscetíveis à Desertificação (ASD).",
    imageData: {
      "2004": {
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1975_2004",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
      "2020": {
        default: true,
        imageId: "projects/ee-ocaufcg/assets/Index_Aridez_1990_2020",
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1gTKJAJkvLSptxyHGNpEFiRcTio5bbV2a",
      },
    },
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
  },
  SPEI: {
    id: "spei",
    name: "SPEI",
    description: "Trabalho em construção",
    imageData: {
      general: {
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/SPEI_12_13",
      },
    },
  },
  carbono: {
    id: "carbono",
    name: "carbono",
    description:
      "O carbono orgânico do solo está relacionado com a saúde do solo, pois influencia diretamente na sua estrutura, ajudando a evitar a compactação e melhorando a retenção de nutrientes e água. Solos com baixos níveis de carbono orgânico tendem a perder sua fertilidade ao longo do tempo. A seguir tem-se o mapa de carbono orgânico do solo para o estado da Paraíba, onde se observa os piores valores localizados ao norte da Borborema, estendendo-se em direção ao Sertão Paraibano.",
    imageData: {
      general: {
        posterUrl:
          "https://drive.google.com/uc?export=view&id=1rWotBs8JZg4QJT3yOGI_EoCgWAtVsCfP",
        imageId: "projects/ee-ocaufcg/assets/carbono_g_kg",
      },
    },
  },
};
