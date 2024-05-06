import { LogoImage, NavItem, NavList, Navbar, Wrapper } from "./Header.styles";
import Logo from "@/../public/logo-oca-simple.svg";

interface Section {
  name: string;
  href: string;
}

const Header = (props: any) => {
  const sections: Section[] = [
    {
      name: "Sobre nós",
      href: "#sobre-nos",
    },
    {
      name: "Mapas e Visualizações",
      href: "#mapa-e-visualizações",
    },
    {
      name: "Nosso time",
      href: "#nosso-time",
    },
    {
      name: "Apoiadores",
      href: "#apoiadores",
    },
  ];

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
