import { IEEInfo, ISection } from "./interfaces";

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
    href: "/#maps-visu",
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
  posterUrl: "/defaultMapsPoster.png",
  minScale: 0,
  maxScale: 1,
};

export const MAP_TIFF_STYLE =
  "https://api.maptiler.com/maps/basic-v2/style.json?key=71L2QPZ0FHRofxg3QtVC";
export const MAP_TIFF_BRAZIL_STATES =
  "https://raw.githubusercontent.com/OCA-UFCG/countries-geo-data/main/public/data/brazil-states.geojson";
export const MAP_TIFF_BRAZIL_CITIES =
  "https://raw.githubusercontent.com/OCA-UFCG/municipal-brazilian-geodata/master/minified/cities.min.json";
