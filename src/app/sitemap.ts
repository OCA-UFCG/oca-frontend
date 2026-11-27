import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/constants";
import { PROJECTS } from "@/utils/projects";

const PAGES = [
  "",
  "/projetos",
  "/pesquisa",
  "/map",
  "/about",
  "/team",
  "/collab",
  "/infra",
  "/faq",
  "/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...PAGES, ...PROJECTS.map(({ slug }) => `/projetos/${slug}`)].map(
    (path) => ({ url: `${SITE_URL}${path}` }),
  );
}
