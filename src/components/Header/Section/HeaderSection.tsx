"use client";

import HeaderModal from "@/components/Header/Modal/HeaderModal";
import { LogoImage, MainHeader, Wrapper } from "./HeaderSection.styles";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <Wrapper>
      <HeaderModal />
      <Link href="/">
        <LogoImage src="/oca_logan.svg" alt="OCA" width={148} height={75} />
      </Link>
      <MainHeader />
    </Wrapper>
  );
};

export default HeaderSection;
