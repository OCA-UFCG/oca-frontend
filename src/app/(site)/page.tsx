import Image from "next/image";
import {
  LuArrowRight,
  LuChartColumn,
  LuExternalLink,
  LuInstagram,
  LuMail,
} from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import {
  InstagramGrid,
  PartnerLogos,
  ProjectCard,
  Sparkle,
} from "@/components/Redesign/Blocks";
import {
  ButtonLink,
  CardBody,
  Cards,
  Card,
  Heading,
  IconBadge,
} from "@/components/Redesign/styles";
import { INSTAGRAM_URL } from "@/utils/constants";
import { PLATFORMS, PROJECTS } from "@/utils/projects";
import {
  Eyebrow,
  Follow,
  FollowCards,
  Hero,
  PlatformCards,
  Section,
  SectionTop,
  Stats,
  Thumb,
  Who,
  WhoPhoto,
  WhoText,
} from "./styles";

// ponytail: números em aberto (o design tem placeholder "09+"); trocar `null` pelo valor
const STATS: { value: string | null; label: string }[] = [
  { value: null, label: "Projetos" },
  { value: null, label: "Anos de atuação" },
  { value: null, label: "Participantes" },
  { value: null, label: "Parceiros institucionais" },
];

const isExternal = (url: string) => url.startsWith("http");

export default function Home() {
  return (
    <Template>
      <Hero>
        <Image
          src="/redesign/home-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <h1>
          Ciência de ponta para entender e proteger a Caatinga e o Nordeste
        </h1>
        <p>
          Do monitoramento aos dados abertos: conheça os projetos e as
          plataformas que o OCA desenvolve para o Semiárido brasileiro.
        </p>
        <ButtonLink href="/projetos" $small>
          Conheça nossos projetos
        </ButtonLink>
      </Hero>

      <Stats aria-label="O OCA em números">
        {STATS.map(({ value, label }) => (
          <li key={label}>
            <LuChartColumn size={24} aria-hidden />
            <strong>{value ?? "—"}</strong>
            {label}
          </li>
        ))}
      </Stats>

      <Section $tone="surface">
        <SectionTop>
          <div>
            <Eyebrow>Portfólio</Eyebrow>
            <Heading>Projetos</Heading>
          </div>
          <ButtonLink href="/projetos" $small>
            Ver todos os projetos <LuArrowRight size={16} aria-hidden />
          </ButtonLink>
        </SectionTop>
        <Cards>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Cards>
      </Section>

      <Section $tone="background">
        <SectionTop>
          <div>
            <Eyebrow>Ferramentas digitais</Eyebrow>
            <Heading>Plataformas</Heading>
          </div>
        </SectionTop>
        <PlatformCards>
          {PLATFORMS.map(({ name, description, image, url }) => (
            <li key={name}>
              <Thumb>
                <Image
                  src={image}
                  alt={`Tela da plataforma ${name}`}
                  fill
                  sizes="(max-width: 1000px) 300px, 420px"
                />
              </Thumb>
              <CardBody>
                <h3>{name}</h3>
                <p>{description}</p>
                <ButtonLink
                  href={url}
                  {...(isExternal(url) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  Acessar <LuExternalLink size={16} aria-hidden />
                </ButtonLink>
              </CardBody>
            </li>
          ))}
        </PlatformCards>
      </Section>

      <Who>
        <WhoPhoto>
          <Image
            src="/redesign/sobre-equipe.jpg"
            alt="Equipe do OCA reunida em frente a um prédio da UFCG"
            fill
            sizes="(max-width: 1000px) 100vw, 50vw"
          />
          <Sparkle size={32} floating />
        </WhoPhoto>
        <WhoText>
          <p>QUEM SOMOS</p>
          <h2>Observatório da Caatinga e Desertificação</h2>
          <p>
            Um grupo transdisciplinar de pesquisa, inovação e inteligência
            territorial da UFCG, dedicado à produção de evidências para
            políticas públicas no Nordeste, no Semiárido e na Caatinga.
          </p>
          <ButtonLink href="/about" $small>
            Saiba mais
          </ButtonLink>
        </WhoText>
      </Who>

      <Section $tone="surface">
        <Heading>Parceiros</Heading>
        <PartnerLogos />
      </Section>

      <Follow>
        <Heading>Acompanhe o OCA</Heading>
        <FollowCards>
          <Card>
            <h3>
              <IconBadge>
                <LuInstagram size={18} aria-hidden />
              </IconBadge>
              Instagram
            </h3>
            <InstagramGrid count={3} />
            <p>@oca.ufcg</p>
            <ButtonLink
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Seguir
            </ButtonLink>
          </Card>
          <Card>
            <h3>
              <IconBadge>
                <LuMail size={18} aria-hidden />
              </IconBadge>
              Fale com a gente
            </h3>
            <p>
              Dúvidas, parcerias ou sugestões: mande sua mensagem pelo
              formulário de contato.
            </p>
            <ButtonLink href="/contact-us">Ir para o contato</ButtonLink>
          </Card>
        </FollowCards>
      </Follow>
    </Template>
  );
}
