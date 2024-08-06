import { IEEInfo, ISection, INews } from "./interfaces";

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
            url: "images.ctfassets.net/49yodhe2mply/7EZ7TU15FiOxrbIRZCvuPZ/9c8efc4158c700abde67ca84f8268a1c/Frame_214__1_.png",
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
