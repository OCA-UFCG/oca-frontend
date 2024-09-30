"use client";

import {
  Wrapper,
  Divider,
  LogoImage,
  References,
  Sections,
  InnerSections,
  SectionTitle,
  SectionOptions,
  SocialMedia,
  SocialMediasContainer,
} from "./Footer.styles";
import { Icon } from "../Icon/Icon";
import { channels, sections } from "@/utils/constants";

const Footer = () => {
  return (
    <Wrapper>
      <LogoImage id="logo-oca-white" width={200} height={150} />
      <References>
        <Sections>
          {Object.entries(sections).map(([key, item]) => (
            <InnerSections key={key}>
              <SectionTitle href={item.path || ""}>
                {item.name}
                <Divider />
              </SectionTitle>
              {item.children != undefined
                ? Object.entries(item.children).map(([innerKey, innerItem]) => (
                    <SectionOptions key={innerKey} href={innerItem.path || ""}>
                      {innerItem.name}
                    </SectionOptions>
                  ))
                : undefined}
            </InnerSections>
          ))}
        </Sections>

        <SocialMediasContainer>
          {channels.map(({ href, icon, size }, index) => (
            <SocialMedia target="_blank" key={index} title={href} href={href}>
              <Icon id={icon} size={size} />
            </SocialMedia>
          ))}
        </SocialMediasContainer>
      </References>
    </Wrapper>
  );
};

export default Footer;
