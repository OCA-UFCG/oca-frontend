import Image from "next/image";
import { INSTAGRAM_POSTS, INSTAGRAM_URL, PARTNERS } from "@/utils/constants";
import { Logos, Posts, SparkleSvg } from "./styles";

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

export const PartnerLogos = () => (
  <Logos>
    {PARTNERS.map(({ name, img, w, h }) => (
      <li key={name}>
        <Image src={img} alt={name} width={w} height={h} />
      </li>
    ))}
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
