import { ISections } from "@/utils/interfaces";
import { PROJECTS } from "@/utils/projects";

// Prefixo da prévia escondida. No lançamento vira "" e esta pasta substitui o site antigo.
export const BASE = "/preview";

export const INSTAGRAM_URL = "https://www.instagram.com/oca.ufcg/";

// ponytail: canal ainda não existe; com o link, o botão da Home ativa
export const WHATSAPP_URL = "";

export const CONTACT_EMAIL = "obs.caatinga@gmail.com";

export const channels = [
  { name: "Instagram", href: INSTAGRAM_URL, icon: "/redesign/instagram.svg" },
];

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

// Páginas fora do menu principal, linkadas só no rodapé (team/collab/infra são as do site atual).
export const footerLinks = [
  { name: "Equipe", path: "/team" },
  { name: "Colaboradores", path: "/collab" },
  { name: "Infraestrutura", path: "/infra" },
  { name: "FAQ", path: `${BASE}/faq` },
];

export const sections: ISections = {
  home: { name: "Início", path: BASE },
  projects: {
    name: "Projetos",
    path: `${BASE}/projetos`,
    children: {
      all: { name: "Todos os projetos", path: `${BASE}/projetos` },
      ...Object.fromEntries(
        PROJECTS.map(({ slug, name, menu }) => [
          slug,
          { name: menu ?? name, path: `${BASE}/projetos/${slug}` },
        ]),
      ),
    },
  },
  research: { name: "Pesquisa", path: `${BASE}/pesquisa` },
  about: { name: "Sobre", path: `${BASE}/about` },
  contact: { name: "Contato", path: `${BASE}/contact-us` },
};
