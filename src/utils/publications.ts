import { IPublication } from "./interfaces";

export interface IPublicationDetails extends IPublication {
  year?: number;
  authors?: string; // "Primeiro Autor et al."
  journal?: string;
}

// Metadado de DOI não muda: 30 dias de cache.
const DOI_REVALIDATE = 60 * 60 * 24 * 30;

const decode = (text: string) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export const doiOf = (href: string) =>
  href.match(/doi\.org\/(10\.[^\s?#]+)/i)?.[1];

// Completa ano, autores e revista pelo DOI (Crossref). Se falhar, fica só o
// que veio do Contentful.
const withDetails = async (
  publication: IPublication,
): Promise<IPublicationDetails> => {
  const doi = doiOf(publication.href);
  if (!doi) return publication;

  try {
    const res = await fetch(`https://api.crossref.org/works/${doi}`, {
      headers: {
        "User-Agent": "OCA-site (https://github.com/OCA-UFCG/oca-frontend)",
      },
      next: { revalidate: DOI_REVALIDATE },
    });
    if (!res.ok) return publication;

    const { message } = await res.json();
    const [first, ...rest] = message.author ?? [];
    const name = first && [first.given, first.family].filter(Boolean).join(" ");

    return {
      ...publication,
      year: message.issued?.["date-parts"]?.[0]?.[0],
      authors: name && (rest.length ? `${name} et al.` : name),
      journal:
        message["container-title"]?.[0] &&
        decode(message["container-title"][0]),
    };
  } catch {
    return publication;
  }
};

export const addDetails = (publications: IPublication[]) =>
  Promise.all(publications.map(withDetails));
