import {
  IEEInfo,
  IOCAChannel,
  ISections,
  INews,
  IContactStatus,
} from "./interfaces";

export const REVALIDATE = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
  ? 60
  : 3600;

export const channels: IOCAChannel[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/oca.ufcg/",
    icon: "/redesign/instagram.svg",
  },
];

export const CONTACT_EMAIL = "obs.caatinga@gmail.com";

// Páginas fora do menu principal, linkadas só no rodapé.
export const footerLinks = [
  { name: "Equipe", path: "/team" },
  { name: "Colaboradores", path: "/collab" },
  { name: "Infraestrutura", path: "/infra" },
  { name: "FAQ", path: "/faq" },
];

export const sections: ISections = {
  home: { name: "Início", path: "/" },
  projects: {
    name: "Projetos",
    path: "/projetos",
    children: {
      all: { name: "Todos os projetos", path: "/projetos" },
      map: { name: "Plataforma do OCA", path: "/map" },
      croqui: { name: "Croqui", path: "/croqui" },
    },
  },
  research: { name: "Pesquisa", path: "/pesquisa" },
  about: { name: "Sobre", path: "/about" },
  contact: { name: "Contato", path: "/contact-us" },
};

export const defaultEEInfo: IEEInfo = {
  id: "",
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
  type: "default",
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

export const contactStatus: IContactStatus = {
  success: {
    message: "Mensagem enviada",
    icon: "check",
  },
  error: {
    message: "Enviar novamente",
    icon: "retry",
  },
  loading: {
    message: "Enviando...",
    icon: "loading",
    animation: "spin",
  },
  default: {
    message: "Enviar",
    icon: "send",
  },
};

export const MAP_TIFF_STYLE =
  "https://api.maptiler.com/maps/basic-v2/style.json?key=71L2QPZ0FHRofxg3QtVC";
export const MAP_TIFF_BRAZIL_STATES =
  "https://raw.githubusercontent.com/OCA-UFCG/oca-metadata/main/mapMetadata/brazil-states.geojson";
export const MAP_TIFF_BRAZIL_CITIES =
  "https://raw.githubusercontent.com/OCA-UFCG/oca-metadata/main/mapMetadata/cities.min.json";
