import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowRight, LuExternalLink } from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import { PartnerLogos } from "@/components/Redesign/Blocks";
import { ButtonLink, Heading, SectionTop } from "@/components/Redesign/styles";
import { PROJECTS } from "@/utils/projects";
import {
  Banner,
  Gallery,
  Intro,
  Light,
  Others,
  Platform,
  Screenshot,
  SubHeading,
  Text,
} from "./styles";

// ponytail: "Últimas atualizações" do design entra quando houver fonte de notícias (Contentful)
export const dynamicParams = false;
export const generateStaticParams = () =>
  PROJECTS.map(({ slug }) => ({ slug }));

const findProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const project = findProject(params.slug);

  return { title: project?.title ?? project?.name };
};

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) notFound();

  const { name, title, status, partners, about, platform, gallery } = project;
  const others = project.others.map((slug) => findProject(slug)!);

  return (
    <Template>
      <Banner>
        <Image src={project.banner} alt="" fill priority sizes="100vw" />
      </Banner>

      <Intro>
        <span>{status}</span>
        <h1>{title ?? name}</h1>
        <SubHeading>Sobre o projeto</SubHeading>
        <Text>
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {platform && <strong>{platform.intro}</strong>}
        </Text>
      </Intro>

      {platform && (
        <>
          <Platform>
            <div>
              <Image
                src={platform.logo}
                alt={platform.name}
                width={140}
                height={64}
              />
              <h2>{platform.title}</h2>
              <p>{platform.summary}</p>
              {platform.url && (
                <ButtonLink href={platform.url} {...external}>
                  Acessar plataforma <LuExternalLink size={16} aria-hidden />
                </ButtonLink>
              )}
            </div>
            <Screenshot>
              <Image
                src={platform.screenshot}
                alt={`Tela da plataforma ${platform.name}`}
                fill
                sizes="(max-width: 1000px) 100vw, 640px"
              />
            </Screenshot>
          </Platform>

          <Intro>
            <SubHeading>Sobre a plataforma</SubHeading>
            <Text>
              {platform.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {platform.url && (
                <a href={platform.url} {...external}>
                  {platform.cta}
                </a>
              )}
            </Text>
          </Intro>
        </>
      )}

      <Light>
        <SubHeading>Parceiros</SubHeading>
        <PartnerLogos names={[...partners, "UFCG"]} />
      </Light>

      {gallery && (
        <Light>
          <SubHeading>Galeria e registros</SubHeading>
          <Gallery>
            {gallery.map((src) => (
              <li key={src}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 1000px) 50vw, 640px"
                />
              </li>
            ))}
          </Gallery>
        </Light>
      )}

      <Light>
        <SectionTop>
          <Heading>Conheça outros projetos do OCA</Heading>
          <ButtonLink href="/projetos" $small>
            Ver todos os projetos <LuArrowRight size={16} aria-hidden />
          </ButtonLink>
        </SectionTop>
        <Others>
          {others.map(({ slug, name, short, image }) => (
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
                {short ?? name}
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
