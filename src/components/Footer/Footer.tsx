import {
  Wrapper,
  Divider,
  LogoImage,
  References,
  Sections,
  Channels,
} from "./Footer.styles";

interface IOCAChannel {
  name: string;
  href: string;
  icon: string;
}

interface ISection {
  name: string;
  href: string;
}

const Footer = () => {
  const sections: ISection[] = [
    {
      name: "Voltar ao topo",
      href: "#root",
    },
    {
      name: "Sobre nós",
      href: "#about",
    },
    {
      name: "Parceiros",
      href: "#sponsors",
    },
    {
      name: "Nossa Equipe",
      href: "#teamMembers",
    },
  ];

  const channels: IOCAChannel[] = [
    {
      name: "GitHub",
      href: "https://github.com/OCA-UFCG",
      icon: "github.svg",
    },
  ];

  return (
    <Wrapper>
      <LogoImage src="logo-oca-full.svg" alt="Logo" width={150} height={150} />
      <References>
        {sections.map(({ href, name }: ISection, index: number) => (
          <Sections key={index} href={href}>
            {name}
          </Sections>
        ))}
        <Divider />
        {channels.map(({ name, href, icon }, index) => (
          <Channels key={index} href={href}>
            <img src={icon} alt={name} />
          </Channels>
        ))}
      </References>
    </Wrapper>
  );
};

export default Footer;
