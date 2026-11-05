import { LuInstagram, LuMail, LuMap } from "react-icons/lu";
import Template from "@/templates/hubTemplate";
import ContactForm from "@/components/ContactForm/ContactForm";
import { CONTACT_EMAIL, INSTAGRAM_URL, REVALIDATE } from "@/utils/constants";
import { InstagramGrid } from "@/components/Redesign/Blocks";
import { ISectionHeader } from "@/utils/interfaces";
import { getContent } from "@/utils/contentful";
import { CONTACT_PAGE_QUERY, CONTACT_PAGES_ID } from "@/utils/queries";
import {
  Address,
  Channels,
  Column,
  Grid,
  Label,
  Lead,
  MapFrame,
  Value,
} from "./styles";
import {
  ButtonLink,
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
            <InstagramGrid count={6} />
            <ButtonLink
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Seguir
            </ButtonLink>
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
