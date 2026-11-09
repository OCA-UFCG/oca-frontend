import Image from "next/image";
import {
  LuArrowRight,
  LuChartColumn,
  LuExternalLink,
  LuInstagram,
  LuMail,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import Template from "@/app/(preview)/preview/_components/Template";
import Carousel from "@/app/(preview)/preview/_components/Carousel";
import {
  InstagramGrid,
  PartnerLogos,
  ProjectCard,
  Sparkle,
} from "@/app/(preview)/preview/_components/Blocks";
import {
  Button,
  ButtonLink,
  CardBody,
  Cards,
  Card,
  Heading,
  IconBadge,
  SectionTop,
} from "@/app/(preview)/preview/_components/styles";
import {
  BASE,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from "@/app/(preview)/preview/_components/constants";
import { HOME_PROJECTS, PLATFORM_PROJECTS } from "@/utils/projects";
import {
  Eyebrow,
  Follow,
  FollowCards,
  Hero,
  Section,
  Stats,
  Thumb,
  Who,
  WhoPhoto,
  WhoText,
} from "./styles";
import NewsletterForm from "./NewsletterForm";

// Números do Figma de 08/11/2026.
const STATS = [
  { value: "09+", label: "Projetos" },
  { value: "15+", label: "Anos de atuação" },
  { value: "50+", label: "Participantes" },
  { value: "20+", label: "Parceiros institucionais" },
];

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
        <ButtonLink href={`${BASE}/projetos`} $small>
          Conheça nossos projetos
        </ButtonLink>
      </Hero>

      <Stats aria-label="O OCA em números">
        {STATS.map(({ value, label }) => (
          <li key={label}>
            <LuChartColumn size={24} aria-hidden />
            <strong>{value}</strong>
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
          <ButtonLink href={`${BASE}/projetos`} $small>
            Ver todos os projetos <LuArrowRight size={16} aria-hidden />
          </ButtonLink>
        </SectionTop>
        <Carousel label="Projetos">
          <Cards>
            {HOME_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Cards>
        </Carousel>
      </Section>

      <Section $tone="background">
        <SectionTop>
          <div>
            <Eyebrow>Ferramentas digitais</Eyebrow>
            <Heading>Plataformas</Heading>
          </div>
        </SectionTop>
        <Carousel label="Plataformas">
          <Cards>
            {PLATFORM_PROJECTS.map(({ slug, platform }) => {
              const { name, summary, card, url } = platform!;

              return (
                <li key={slug}>
                  <Thumb>
                    <Image
                      src={card}
                      alt={`Tela da plataforma ${name}`}
                      fill
                      sizes="382px"
                    />
                  </Thumb>
                  <CardBody>
                    <h3>{name}</h3>
                    <p>{summary}</p>
                    {url ? (
                      <ButtonLink
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-card
                      >
                        Acessar <LuExternalLink size={16} aria-hidden />
                      </ButtonLink>
                    ) : (
                      <ButtonLink href={`${BASE}/projetos/${slug}`} data-card>
                        Saiba mais <LuArrowRight size={16} aria-hidden />
                      </ButtonLink>
                    )}
                  </CardBody>
                </li>
              );
            })}
          </Cards>
        </Carousel>
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
            O Observatório da Caatinga e Desertificação (OCA) é um grupo
            transdisciplinar de pesquisa, inovação e inteligência territorial
            dedicado à produção de evidências para políticas públicas no
            Nordeste, no Semiárido e na Caatinga.
          </p>
          <ButtonLink href={`${BASE}/about`} $small>
            Saiba mais
          </ButtonLink>
        </WhoText>
      </Who>

      <Section $tone="surface">
        <Heading>Parceiros</Heading>
        <Carousel label="Parceiros">
          <PartnerLogos />
        </Carousel>
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
                <FaWhatsapp size={18} aria-hidden />
              </IconBadge>
              Canal no WhatsApp
            </h3>
            <p>
              Entre no nosso canal no WhatsApp e receba novidades sobre o OCA
              diretamente no celular.
            </p>
            {WHATSAPP_URL ? (
              <ButtonLink
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrar no canal
              </ButtonLink>
            ) : (
              <Button disabled>Entrar no canal</Button>
            )}
          </Card>
          <Card>
            <h3>
              <IconBadge>
                <LuMail size={18} aria-hidden />
              </IconBadge>
              Informativo por e-mail
            </h3>
            <NewsletterForm />
          </Card>
        </FollowCards>
      </Follow>
    </Template>
  );
}
