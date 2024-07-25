import Link from "next/link";
import { LogoImage, NavList, Navbar, Wrapper } from "./Header.styles";
import { sections } from "@/utils/constants";
import { Dropdown } from "@/components/Dropdown/Dropdown";

const Header = (props?: any) => {
  return (
    <Wrapper {...props}>
      <Link href="/">
        <LogoImage id="logo-oca-full" />
      </Link>
      <Navbar>
        <NavList>
          {Object.entries(sections).map(([key, item]) => (
            <Dropdown item={item} key={key} />
          ))}
        </NavList>
      </Navbar>
      <div style={{ cursor: "not-allowed" }}></div>{" "}
      {/* TODO: ADD language component */}
    </Wrapper>
  );
};

export default Header;
