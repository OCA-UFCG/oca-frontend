import { IOCAChannel } from "@/utils/interfaces";
import { sections } from "@/utils/constants";
import {
  Wrapper,
  Divider,
  LogoImage,
  References,
  Sections,
  SocialMedia,
  SocialMediasContainer,
} from "./Footer.styles";
import { Icon } from "../Icon/Icon";

const Footer = () => {
  const channels: IOCAChannel[] = [
    {
      name: "GitHub",
      href: "https://github.com/OCA-UFCG",
      icon: "github",
    },
    {
      name: "White instagram icon with a camera drawing",
      href: "https://www.instagram.com/observatorio.caatinga/",
      icon: "instagram",
    },
  ];

  return (
    <Wrapper>
      <LogoImage id="logo-oca-white" width={150} height={150} />
      <References>
        {Object.entries(sections).map(([key, item]) => (
          <Sections key={key} href={item.path}>
            {item.name}
          </Sections>
        ))}
        <Divider />
        <SocialMediasContainer>
          {channels.map(({ name, href, icon }, index) => (
            <SocialMedia target="_blank" key={index} title={name} href={href}>
              <Icon id={icon} size={24} />
            </SocialMedia>
          ))}
        </SocialMediasContainer>
      </References>
    </Wrapper>
  );
};

export default Footer;
