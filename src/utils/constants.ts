import { IEEInfo, ISections } from "./interfaces";

export const sections: ISections = {
  home: {
    name: "Início",
    path: "/",
    children: {
      // updates: {
      //   name: "Últimas atualizações",
      //   path: "/#ultimas-atualizacoes",
      // },

      publications: {
        name: "Publicações",
        path: "/#publications",
      },
      maps: {
        name: "Mapas & Visualizações",
        path: "/#maps-visu",
      },
      partners: {
        name: "Parceiros",
        path: "/#sponsors",
      },
    },
  },
  map: {
    name: "Mapa",
    path: "/map",
  },
  about: {
    name: "Sobre nós",
    path: "/about",
    children: {
      team: {
        name: "Nosso time",
        path: "/#teamMembers",
      },
    },
  },
  contact: { name: "Fale conosco", path: "/contato" },
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
  poster: "/defaultMapsPoster.png",
  minScale: 0,
  maxScale: 1,
};

export const MAP_TIFF_STYLE =
  "https://api.maptiler.com/maps/basic-v2/style.json?key=71L2QPZ0FHRofxg3QtVC";
export const MAP_TIFF_BRAZIL_STATES =
  "https://raw.githubusercontent.com/OCA-UFCG/countries-geo-data/main/public/data/brazil-states.geojson";
export const MAP_TIFF_BRAZIL_CITIES =
  "https://raw.githubusercontent.com/OCA-UFCG/municipal-brazilian-geodata/master/minified/cities.min.json";
