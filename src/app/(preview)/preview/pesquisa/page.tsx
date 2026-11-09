import Image from "next/image";
import Template from "@/app/(preview)/preview/_components/Template";
import {
  Heading,
  HeroGrid,
  Numbers,
  Title,
} from "@/app/(preview)/preview/_components/styles";
import { REVALIDATE } from "@/utils/constants";
import { getContent } from "@/utils/contentful";
import { IPublication } from "@/utils/interfaces";
import { addDetails } from "@/utils/publications";
import { RESEARCH_PAGE_QUERY } from "@/utils/queries";
import Publications from "./Publications";
import { Lines } from "./styles";

export const revalidate = REVALIDATE;

const LINES = [
  {
    name: "Avaliação de Serviços Ecossistêmicos no Semiárido",
    img: "/redesign/linha-arvore.jpg",
  },
  {
    name: "Modelagem ambiental e climática da Caatinga",
    img: "/redesign/linha-arvore.jpg",
  },
  {
    name: "Desenvolvimento de Plataformas Computacionais para Gestão Socioambiental",
    img: "/redesign/linha-pedras.jpg",
  },
  {
    name: "Monitoramento da desertificação",
    img: "/redesign/linha-pedras.jpg",
  },
];

export default async function Research() {
  const {
    publicationsCollection: { items },
  }: { publicationsCollection: { items: IPublication[] } } =
    await getContent(RESEARCH_PAGE_QUERY);
  const publications = await addDetails(items);
  const numbers = [
    {
      value: String(publications.length).padStart(2, "0"),
      label: "publicações",
    },
    { value: "30+", label: "pesquisadores" },
  ];

  return (
    <Template>
      <HeroGrid $blob="/redesign/blob-bege.svg">
        <div>
          <Title>Pesquisas</Title>
          <p>
            Desenvolvemos pesquisas em rede para compreender as dinâmicas
            ambientais, climáticas e socioeconômicas da Caatinga e subsidiar
            políticas públicas voltadas à conservação e ao uso sustentável dos
            recursos naturais.
          </p>
        </div>
        <Numbers aria-label="Pesquisa em números">
          {numbers.map(({ value, label }) => (
            <li key={label}>
              <strong>{value}</strong>
              {label}
            </li>
          ))}
        </Numbers>
      </HeroGrid>

      <Lines>
        <p>O QUE PESQUISAMOS</p>
        <Heading>Linhas de pesquisa</Heading>
        <p>
          Nossas pesquisas integram diferentes áreas do conhecimento e são
          desenvolvidas por doutores, mestres e estudantes de graduação e
          pós-graduação da UFCG e de instituições parceiras. Esse trabalho se
          organiza em quatro linhas:
        </p>
        <ul>
          {LINES.map(({ name, img }) => (
            <li key={name}>
              <Image
                src={img}
                alt=""
                fill
                sizes="(max-width: 1000px) 100vw, 640px"
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </Lines>

      <Publications items={publications} />
    </Template>
  );
}
