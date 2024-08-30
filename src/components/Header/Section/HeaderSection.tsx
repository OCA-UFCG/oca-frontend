"use client";

import HeaderModal from "@/components/Header/Modal/HeaderModal";
import { LogoImage, MainHeader, Wrapper } from "./HeaderSection.styles";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <Wrapper>
      <HeaderModal />
      <Link href="/">
        <LogoImage id="logo-oca" size={48} />
      </Link>
      <MainHeader />
    </Wrapper>
  );
};

export default HeaderSection;
