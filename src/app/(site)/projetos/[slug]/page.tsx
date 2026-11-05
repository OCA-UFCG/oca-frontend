import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { LuArrowRight, LuExternalLink } from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import { PartnerLogos } from "@/components/Redesign/Blocks";
import { ButtonLink, Heading, SectionTop } from "@/components/Redesign/styles";
import { PARTNERS } from "@/utils/constants";
import { PROJECTS } from "@/utils/projects";
import {
  About,
  Banner,
  Info,
  Intro,
  Light,
  Others,
  Platform,
  Screenshot,
  SubHeading,
} from "./styles";

// ponytail: galeria e "últimas atualizações" do design entram quando houver conteúdo
export const dynamicParams = false;
export const generateStaticParams = () =>
  PROJECTS.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => ({
  title: PROJECTS.find(({ slug }) => slug === params.slug)?.name,
});

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find(({ slug }) => slug === params.slug);
  if (!project) notFound();

  const { name, category, status, period, area, studyArea, partner } = project;
  const info = [
    ["Período", period],
    ["Área de abrangência", area],
    ["Área de estudo", studyArea],
  ].filter(([, value]) => value);
  const hasLogo = PARTNERS.some((p) => p.name === partner);
  const others = PROJECTS.filter(({ slug }) => slug !== project.slug).slice(
    0,
    3,
  );

  return (
    <Template>
      <Banner>
        <Image src={project.image} alt="" fill priority sizes="100vw" />
      </Banner>

      <Intro>
        {status && <span>{status}</span>}
        <h1>{name}</h1>
        <SubHeading>Sobre o projeto</SubHeading>
        <About>
          {info.length > 0 && (
            <Info>
              {info.map(([label, value]) => (
                <Fragment key={label}>
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))}
            </Info>
          )}
          <p>{project.description}</p>
        </About>
      </Intro>

      {partner && hasLogo && (
        <Light>
          <SubHeading>Parceiros</SubHeading>
          <PartnerLogos names={[partner]} />
        </Light>
      )}

      {project.url && (
        <Platform>
          <div>
            <small>{category}</small>
            <h2>{name}</h2>
            <p>{project.description}</p>
            <ButtonLink
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar plataforma <LuExternalLink size={16} aria-hidden />
            </ButtonLink>
          </div>
          {project.screenshot && (
            <Screenshot>
              <Image
                src={project.screenshot}
                alt={`Tela da plataforma ${name}`}
                fill
                sizes="(max-width: 1000px) 100vw, 640px"
              />
            </Screenshot>
          )}
        </Platform>
      )}

      <Light>
        <SectionTop>
          <Heading>Conheça outros projetos do OCA</Heading>
          <ButtonLink href="/projetos" $small>
            Ver todos os projetos <LuArrowRight size={16} aria-hidden />
          </ButtonLink>
        </SectionTop>
        <Others>
          {others.map(({ slug, name, image }) => (
            <li key={slug}>
              <div>
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 1000px) 100vw, 420px"
                />
              </div>
              <div>
                {name}
                <Link href={`/projetos/${slug}`}>
                  Saiba mais <LuArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </Others>
      </Light>
    </Template>
  );
}
