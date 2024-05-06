import {
  Wrapper,
  Divider,
  LogoImage,
  References,
  Sections,
  Channels,
} from "./Footer.styles";
import { ISection, IOCAChannel } from "@/utils/interfaces";
import { sections } from "@/utils/constants";

const Footer = () => {
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
          <Channels target="_blank" key={index} href={href}>
            <img src={icon} alt={name} />
          </Channels>
        ))}
      </References>
    </Wrapper>
  );
};

export default Footer;
