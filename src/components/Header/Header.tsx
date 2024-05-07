import Logo from "@/../public/logo-oca-simple.svg";
import { ISection } from "@/utils/interfaces";
import { LogoImage, NavItem, NavList, Navbar, Wrapper } from "./Header.styles";
import { sections } from "@/utils/constants";
import Link from "next/link";

const Header = (props: any) => {
  return (
    <Wrapper {...props}>
      <LogoImage src={Logo} alt="" />
      <Navbar>
        <NavList>
          {sections.map(({ href, name }: ISection, index: number) => (
            <NavItem key={index}>
              <Link href={href}>{name}</Link>
            </NavItem>
          ))}
        </NavList>
      </Navbar>
      <div>pt-br</div> {/* TODO: ADD language component */}
    </Wrapper>
  );
};

export default Header;
