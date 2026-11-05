import Image from "next/image";
import { LuBookOpen, LuChartLine, LuUsers } from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import { Heading, Hero, IconBadge, Title } from "@/components/Redesign/styles";
import {
  Acting,
  ActingTop,
  Areas,
  Logos,
  Partners,
  Photo,
  Pillars,
  Sparkle,
  Territory,
  TerritoryPhoto,
  TerritoryText,
  UfcgNote,
  Who,
  Work,
} from "./styles";

// Conteúdo estático do design (Figma "Página OCA", tela Sobre).
const STAR =
  "M27.66 19.33 23.5 0l-4.17 19.33L0 23.5l19.33 4.16L23.5 47l4.16-19.34L47 23.5z";

const PILLARS = [
  { name: "Ciência", Icon: LuBookOpen },
  { name: "Tecnologia", Icon: LuChartLine },
  { name: "Conhecimento local", Icon: LuUsers },
];

const AREAS = [
  {
    title: "Plataformas digitais e ferramentas de apoio à gestão territorial",
    img: "/redesign/area-plataformas.jpg",
  },
  {
    title: "Monitoramento socioambiental e inteligência territorial",
    img: "/redesign/area-monitoramento.jpg",
  },
  {
    title: "Análise geoespacial e sensoriamento remoto",
    img: "/redesign/area-geoespacial.jpg",
  },
  {
    title: "Indicadores e evidências para políticas públicas",
    img: "/redesign/area-indicadores.jpg",
  },
];

const PARTNERS = [
  { name: "Sudene", img: "/redesign/parceiro-sudene.png", w: 744, h: 420 },
  {
    name: "Governo Federal",
    img: "/redesign/parceiro-govbr.png",
    w: 748,
    h: 268,
  },
  { name: "UFCG", img: "/redesign/parceiro-ufcg.png", w: 156, h: 158 },
];

export default function About() {
  return (
    <Template>
      <Hero $blob="/redesign/blob-bege.svg">
        <Title>Sobre</Title>
        <p>
          Transformamos ciência em soluções para territórios mais resilientes e
          sustentáveis. Olhamos para a Caatinga e o Semiárido como lugares de
          pessoas, saberes e modos de vida, e trabalhamos com comunidades e
          instituições para transformar dados em decisões que melhoram a vida de
          quem vive e atua nesses territórios.
        </p>
      </Hero>

      <Who>
        <div>
          <Heading>Quem somos</Heading>
          <p>
            O Observatório da Caatinga e Desertificação (OCA) é um grupo
            transdisciplinar de pesquisa, inovação e inteligência territorial
            dedicado à produção de evidências para políticas públicas no
            Nordeste, no Semiárido e na Caatinga.
          </p>
          <UfcgNote>
            <Image
              src="/redesign/parceiro-ufcg.png"
              alt="Brasão da UFCG"
              width={96}
              height={97}
            />
            <p>
              Vinculado à Universidade Federal de Campina Grande (UFCG), o OCA
              produz conhecimento e desenvolve plataformas que facilitam o
              acesso a dados e ajudam a compreender as dinâmicas desses
              territórios.
            </p>
          </UfcgNote>
        </div>
        <Photo $ratio="628 / 382">
          <Image
            src="/redesign/sobre-equipe.jpg"
            alt="Equipe do OCA reunida em frente a um prédio da UFCG"
            fill
            sizes="(max-width: 1000px) 100vw, 640px"
          />
          <Sparkle $size={32} $floating viewBox="0 0 47 47" aria-hidden>
            <path d={STAR} />
          </Sparkle>
        </Photo>
      </Who>

      <Territory>
        <TerritoryText>
          <Sparkle $size={48} viewBox="0 0 47 47" aria-hidden>
            <path d={STAR} />
          </Sparkle>
          <h2>
            Onde muitos veem apenas características naturais, enxergamos
            territórios, pessoas e modos de vida.
          </h2>
          <p>
            Com esse olhar, estudamos as secas, a degradação da terra e a
            desertificação para gerar conhecimento e soluções que contribuam
            para a conservação dos ecossistemas, a melhoria das condições de
            vida e o fortalecimento da capacidade dos territórios de enfrentar
            esses desafios.
          </p>
        </TerritoryText>
        <TerritoryPhoto>
          <Image
            src="/redesign/sobre-territorio.jpg"
            alt="Cachoeira entre paredões de pedra e vegetação da Caatinga"
            fill
            sizes="(max-width: 1000px) 100vw, 50vw"
          />
        </TerritoryPhoto>
      </Territory>

      <Acting>
        <ActingTop>
          <div>
            <Heading>Nossa atuação</Heading>
            <h3>
              Nossa atuação conecta ciência, tecnologia e conhecimento local, em
              diálogo com instituições públicas, comunidades e movimentos
              sociais.
            </h3>
            <p>
              Construímos soluções a partir das necessidades de quem vive nos
              territórios e de quem atua em sua gestão, transformando evidências
              em instrumentos úteis para políticas públicas e para um
              desenvolvimento mais resiliente e sustentável.
            </p>
          </div>
          <Photo $ratio="465 / 196">
            <Image
              src="/redesign/sobre-atuacao.jpg"
              alt="Roda de pessoas de mãos dadas em uma oficina com comunidades"
              fill
              sizes="(max-width: 1000px) 100vw, 465px"
            />
            <Sparkle $size={32} $floating viewBox="0 0 47 47" aria-hidden>
              <path d={STAR} />
            </Sparkle>
          </Photo>
        </ActingTop>
        <Pillars>
          {PILLARS.map(({ name, Icon }) => (
            <li key={name}>
              <IconBadge>
                <Icon size={18} aria-hidden />
              </IconBadge>
              {name}
            </li>
          ))}
        </Pillars>
      </Acting>

      <Work>
        <Heading>O que fazemos</Heading>
        <p>
          Mais do que produzir conhecimento científico, o OCA desenvolve
          soluções capazes de apoiar a tomada de decisão e gerar impacto para a
          sociedade.
        </p>
        <h3>Nossas principais áreas de atuação são:</h3>
        <Areas>
          {AREAS.map(({ title, img }, i) => (
            <li key={title}>
              <Photo $ratio="300 / 186" style={{ borderRadius: 0 }}>
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="(max-width: 1000px) 50vw, 300px"
                />
              </Photo>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h4>{title}</h4>
            </li>
          ))}
        </Areas>
      </Work>

      <Partners>
        <Heading>Parceiros</Heading>
        <Logos>
          {PARTNERS.map(({ name, img, w, h }) => (
            <li key={name}>
              <Image src={img} alt={name} width={w} height={h} />
            </li>
          ))}
        </Logos>
      </Partners>
    </Template>
  );
}
