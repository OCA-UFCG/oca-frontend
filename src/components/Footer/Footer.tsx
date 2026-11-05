"use client";

import Image from "next/image";
import {
  CONTACT_EMAIL,
  channels,
  footerLinks,
  sections,
} from "@/utils/constants";
import {
  Bottom,
  Divider,
  Extra,
  Logos,
  NavLink,
  NavList,
  OcaLogo,
  Social,
  Top,
  Wrapper,
} from "./Footer.styles";

const Footer = () => (
  <Wrapper>
    <Top>
      <Logos>
        <Image
          src="/redesign/logo-ufcg-branco.svg"
          alt="Universidade Federal de Campina Grande"
          width={162}
          height={51}
        />
        <OcaLogo src="/oca_logan.svg" alt="OCA" width={96} height={49} />
      </Logos>

      <NavList>
        {Object.entries(sections).map(([key, { name, path }]) => (
          <li key={key}>
            <NavLink href={path ?? "#"}>{name}</NavLink>
          </li>
        ))}
      </NavList>

      <Social>
        {channels.map(({ name, href, icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
          >
            <Image src={icon} alt={name} width={44} height={44} />
          </a>
        ))}
      </Social>
    </Top>

    <Extra aria-label="Mais páginas">
      {footerLinks.map(({ name, path }) => (
        <li key={path}>
          <NavLink href={path}>{name}</NavLink>
        </li>
      ))}
    </Extra>

    <Divider />

    <Bottom>
      <p>
        © {new Date().getFullYear()} OCA — Observatório da Caatinga e
        Desertificação · Universidade Federal de Campina Grande
      </p>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </Bottom>
  </Wrapper>
);

export default Footer;
