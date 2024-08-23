import Link from "next/link";
import {
  LogoImage,
  MediaWrapper,
  NavList,
  Navbar,
  SocialMedia,
  Wrapper,
} from "./Header.styles";
import { channels, sections } from "@/utils/constants";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Icon } from "../Icon/Icon";

const SocialMediaIem = ({
  href,
  icon,
  size,
}: {
  href: string;
  icon: string;
  size: number;
}) => {
  return (
    <MediaWrapper href={href} target="_blank" title={icon}>
      <Icon id={icon} size={size} />
    </MediaWrapper>
  );
};

const Header = (props?: any) => {
  return (
    <Wrapper {...props}>
      <Link href="/">
        <LogoImage id="logo-oca" />
      </Link>
      <Navbar>
        <NavList>
          {Object.entries(sections).map(([key, item]) => (
            <Dropdown item={item} key={key} />
          ))}
        </NavList>
      </Navbar>
      <SocialMedia>
        {channels.map(({ name, icon, href, size }) => (
          <SocialMediaIem
            key={name.toLocaleLowerCase().replace(" ", "-")}
            icon={icon}
            href={href}
            size={size || 24}
          />
        ))}
      </SocialMedia>
    </Wrapper>
  );
};

export default Header;
