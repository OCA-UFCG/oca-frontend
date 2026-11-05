import Image from "next/image";
import { LuInstagram, LuMail, LuMap } from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import ContactForm from "@/components/ContactForm/ContactForm";
import { CONTACT_EMAIL, REVALIDATE } from "@/utils/constants";
import { ISectionHeader } from "@/utils/interfaces";
import { getContent } from "@/utils/contentful";
import { CONTACT_PAGE_QUERY, CONTACT_PAGES_ID } from "@/utils/queries";
import {
  Address,
  Channels,
  Column,
  Follow,
  Grid,
  Label,
  Lead,
  MapFrame,
  Posts,
  Value,
} from "./styles";
import {
  Card,
  Heading,
  Hero,
  IconBadge,
  Title,
} from "@/components/Redesign/styles";

export const revalidate = REVALIDATE;

interface IContactInterface {
  sectionHeadCollection: { items: ISectionHeader[] };
}

const INSTAGRAM_URL = "https://www.instagram.com/oca.ufcg/";

// ponytail: posts fixos no repositório; trocar pelos 6 mais recentes quando a OCA mandar
const POSTS = [
  {
    src: "/redesign/instagram-1.jpg",
    alt: "Post: Grandes projetos se constroem no cotidiano",
  },
  {
    src: "/redesign/instagram-2.jpg",
    alt: "Post: agenda internacional do PPGECA com a Western University",
  },
  {
    src: "/redesign/instagram-3.jpg",
    alt: "Post: conhecendo a equipe de computação do OCA",
  },
];

const MAP_URL =
  "https://maps.google.com/maps?q=Universidade+Federal+de+Campina+Grande,+Rua+Apr%C3%ADgio+Veloso,+882&z=16&output=embed";

const ContactUsPage = async () => {
  const {
    sectionHeadCollection: { items: sectionHead },
  }: IContactInterface = await getContent(CONTACT_PAGE_QUERY);
  const header = sectionHead?.find(({ id }) => id === CONTACT_PAGES_ID[0]);

  return (
    <Template>
      <Hero $blob="/redesign/blob-rosa.svg">
        <Title>Contato</Title>
        {header?.subtitle && <Lead>{header.subtitle}</Lead>}
      </Hero>

      <Channels>
        <Heading>Nossos canais de comunicação</Heading>
        <Grid>
          <Column>
            <Card>
              <Label>Nosso e-mail</Label>
              <Value>
                <IconBadge>
                  <LuMail size={18} aria-hidden />
                </IconBadge>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </Value>
            </Card>
            <Card>
              <Value as="h3">
                <IconBadge>
                  <LuMail size={18} aria-hidden />
                </IconBadge>
                Fale conosco
              </Value>
              <ContactForm />
            </Card>
          </Column>

          <Card>
            <Label>Nosso Instagram</Label>
            <Value>
              <IconBadge>
                <LuInstagram size={18} aria-hidden />
              </IconBadge>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                @oca.ufcg
              </a>
            </Value>
            <Posts>
              {[...POSTS, ...POSTS].map(({ src, alt }, i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={src} alt={alt} fill sizes="200px" />
                </a>
              ))}
            </Posts>
            <Follow
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Seguir
            </Follow>
          </Card>
        </Grid>
      </Channels>

      <Address>
        <Heading>Nosso endereço</Heading>
        <Card>
          <Label>Localização</Label>
          <Value>
            <IconBadge>
              <LuMap size={18} aria-hidden />
            </IconBadge>
            UFCG - Rua Aprígio Veloso, 882, Campina Grande (PB)
          </Value>
          <Label>Bloco BU - Laboratório de Hidráulica II</Label>
          <MapFrame
            src={MAP_URL}
            title="Mapa da UFCG, campus Campina Grande"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Card>
      </Address>
    </Template>
  );
};

export default ContactUsPage;
