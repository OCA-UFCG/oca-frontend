import {
  IEEInfo,
  IOCAChannel,
  ISections,
  INews,
  IContactStatus,
} from "./interfaces";
import { PROJECTS } from "./projects";

export const REVALIDATE = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
  ? 60
  : 3600;

export const INSTAGRAM_URL = "https://www.instagram.com/oca.ufcg/";

export const WHATSAPP_URL =
  "https://whatsapp.com/channel/0029VbDuPJBBlHpjxtUs9B2W";

export const channels: IOCAChannel[] = [
  {
    name: "Instagram",
    href: INSTAGRAM_URL,
    icon: "/redesign/instagram.svg",
  },
  {
    name: "WhatsApp",
    href: WHATSAPP_URL,
    icon: "/redesign/whatsapp.svg",
  },
];

export const CONTACT_EMAIL = "obs.caatinga@gmail.com";

// ponytail: posts fixos no repositório; trocar pelos 6 mais recentes quando a OCA mandar
export const INSTAGRAM_POSTS = [
  {
    src: "/redesign/instagram-1.jpg",
    alt: "Post: Grandes projetos se constroem no cotidiano",
  },
  {
    src: "/redesign/instagram-2.jpg",
    alt: "Post: agenda internacional do PPGECA com a Western University",
  },
  {
    src: "/redesign/instagram-3.jpg",
    alt: "Post: conhecendo a equipe de computação do OCA",
  },
];

export const PARTNERS = [
  { name: "Sudene", img: "/redesign/parceiro-sudene.png", w: 744, h: 420 },
  {
    name: "Governo Federal",
    img: "/redesign/parceiro-govbr.png",
    w: 748,
    h: 268,
  },
  { name: "UFCG", img: "/redesign/parceiro-ufcg.png", w: 156, h: 158 },
  { name: "MMA", img: "/redesign/parceiro-mma.png", w: 552, h: 122 },
  { name: "FAO", img: "/redesign/parceiro-fao.png", w: 567, h: 158 },
  { name: "SEMAS-PE", img: "/redesign/parceiro-semas-pe.png", w: 517, h: 114 },
];

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
      ...Object.fromEntries(
        PROJECTS.map(({ slug, name, menu }) => [
          slug,
          { name: menu ?? name, path: `/projetos/${slug}` },
        ]),
      ),
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
