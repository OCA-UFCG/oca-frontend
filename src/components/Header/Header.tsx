import { LogoImage, NavItem, NavList, Navbar, Wrapper } from "./Header.styles";
import Logo from "@/../public/logo-oca-simple.svg";

interface Section {
  name: string;
  href: string;
}

const Header = (props: any) => {
  return (
    <Wrapper {...props}>
      <LogoImage src={Logo} alt="" />
      <Navbar>
        <NavList>
          {sections.map(({ href, name }: Section, index: number) => (
            <NavItem key={index}>
              <a href={href}>{name}</a>
            </NavItem>
          ))}
        </NavList>
      </Navbar>
      <div>pt-br</div> {/* TODO: ADD language component */}
    </Wrapper>
  );
};

export default Header;
