import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/constants";

// Beta fora das buscas (lição do Data Nordeste: robôs no beta gastam cota à toa).
const BETA = process.env.NEXT_PUBLIC_HOST_URL?.includes("beta");

// /api/ fora: cada chamada lá gasta cota do Earth Engine, do Contentful e de e-mail.
// ponytail: robôs que ignoram o robots.txt só param com limite por IP no nginx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: BETA
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
