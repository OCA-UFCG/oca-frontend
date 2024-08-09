import { IEEInfo, IOCAChannel, ISections, INews } from "./interfaces";

export const channels: IOCAChannel[] = [
  {
    name: "GitHub",
    href: "https://github.com/OCA-UFCG",
    icon: "github",
    size: 22,
  },
  {
    name: "White instagram icon with a camera drawing",
    href: "https://www.instagram.com/observatorio.caatinga/",
    icon: "instagram",
    size: 27,
  },
];

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
        path: "/team",
      },
      history: {
        name: "Nossa história",
        path: "/about",
      },
    },
  },

  // contact: { name: "Fale conosco", path: "/contato" },
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

export const defaultNews: INews[] = [
  {
    fields: {
      thumb: {
        fields: {
          file: {
            url: "images.ctfassets.net/49yodhe2mply/McQyDnf53teKZFqK3C1Fs/e9fcd5be9a16f0883a3e6b5f5c11f08d/Frame_214.png",
          },
        },
      },
      url: "https://www.instagram.com/observatorio.caatinga?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      title: "Observatório da Caatinga",
    },
  },
];

export const MAP_TIFF_STYLE =
  "https://api.maptiler.com/maps/basic-v2/style.json?key=71L2QPZ0FHRofxg3QtVC";
export const MAP_TIFF_BRAZIL_STATES =
  "https://raw.githubusercontent.com/OCA-UFCG/countries-geo-data/main/public/data/brazil-states.geojson";
export const MAP_TIFF_BRAZIL_CITIES =
  "https://raw.githubusercontent.com/OCA-UFCG/municipal-brazilian-geodata/master/minified/cities.min.json";
