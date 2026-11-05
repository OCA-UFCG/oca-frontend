import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuTag } from "react-icons/lu";
import { IProject } from "@/utils/projects";
import { INSTAGRAM_POSTS, INSTAGRAM_URL, PARTNERS } from "@/utils/constants";
import {
  CardBody,
  CardFooter,
  Cover,
  Logos,
  Posts,
  SparkleSvg,
} from "./styles";

// Grade de posts fixos do Instagram; repete a lista até completar `count`.
export const InstagramGrid = ({ count }: { count: number }) => (
  <Posts>
    {Array.from({ length: count }, (_, i) => {
      const { src, alt } = INSTAGRAM_POSTS[i % INSTAGRAM_POSTS.length];

      return (
        <a
          key={i}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={src} alt={alt} fill sizes="200px" />
        </a>
      );
    })}
  </Posts>
);

// Sem `names`, mostra todos os parceiros do OCA.
export const PartnerLogos = ({ names }: { names?: string[] }) => (
  <Logos>
    {PARTNERS.filter(({ name }) => !names || names.includes(name)).map(
      ({ name, img, w, h }) => (
        <li key={name}>
          <Image src={img} alt={name} width={w} height={h} />
        </li>
      ),
    )}
  </Logos>
);

// Estrela de 4 pontas do design; `floating` = sobre foto, no canto inferior esquerdo.
export const Sparkle = ({
  size,
  floating,
}: {
  size: number;
  floating?: boolean;
}) => (
  <SparkleSvg $size={size} $floating={floating} viewBox="0 0 47 47" aria-hidden>
    <path d="M27.66 19.33 23.5 0l-4.17 19.33L0 23.5l19.33 4.16L23.5 47l4.16-19.34L47 23.5z" />
  </SparkleSvg>
);

export const ProjectCard = ({
  project: {
    slug,
    name,
    category,
    partner,
    status,
    period,
    description,
    image,
  },
}: {
  project: IProject;
}) => (
  <li>
    <Cover>
      <Image src={image} alt="" fill sizes="(max-width: 1000px) 300px, 420px" />
      <div>
        {status && <span data-status>{status}</span>}
        <span>{category}</span>
      </div>
      <h3>{name}</h3>
    </Cover>
    <CardBody>
      <p>{description}</p>
      {period && (
        <small>
          <LuCalendarDays size={18} aria-label="Período" />
          {period}
        </small>
      )}
      <CardFooter>
        {partner && (
          <span>
            <LuTag size={16} aria-label="Parceiro" />
            <em>{partner}</em>
          </span>
        )}
        <Link href={`/projetos/${slug}`}>
          Saiba mais <LuArrowRight size={16} aria-hidden />
        </Link>
      </CardFooter>
    </CardBody>
  </li>
);
