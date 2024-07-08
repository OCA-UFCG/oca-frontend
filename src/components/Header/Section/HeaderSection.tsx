import {
  HeaderModal,
  LogoImage,
  MainHeader,
  Wrapper,
} from "./HeaderSection.styles";
import Header from "../Header";
import Link from "next/link";
import { useState } from "react";

const HeaderSection = () => {
  const [retracted, setRetracted] = useState<boolean>(true);

  return (
    <Wrapper>
      <HeaderModal retracted={retracted} setRetracted={setRetracted}>
        <Header />
      </HeaderModal>
      <Link href="/">
        <LogoImage id="logo-oca-full" />
      </Link>
      <MainHeader />
    </Wrapper>
  );
};

export default HeaderSection;
