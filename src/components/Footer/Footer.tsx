import { channels, sections } from "@/utils/constants";
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
  return (
    <Wrapper>
      <LogoImage id="logo-oca-white" width={200} height={150} />
      <References>
        {Object.entries(sections).map(([key, item]) => (
          <Sections key={key} href={item.path || ""}>
            {item.name}
          </Sections>
        ))}
        <Divider />
        <SocialMediasContainer>
          {channels.map(({ name, href, icon, size }, index) => (
            <SocialMedia target="_blank" key={index} title={name} href={href}>
              <Icon id={icon} size={size} />
            </SocialMedia>
          ))}
        </SocialMediasContainer>
      </References>
    </Wrapper>
  );
};

export default Footer;
