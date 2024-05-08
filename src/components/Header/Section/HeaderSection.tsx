import Logo from "@/../public/logo-oca-simple.svg";
import {
  HeaderModal,
  LogoImage,
  MainHeader,
  Wrapper,
} from "./HeaderSection.styles";
import Header from "../Header";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <Wrapper>
      <HeaderModal>
        <Header />
      </HeaderModal>
      <Link href="/">
        <LogoImage src={Logo} alt="" />
      </Link>
      <MainHeader />
    </Wrapper>
  );
};

export default HeaderSection;
