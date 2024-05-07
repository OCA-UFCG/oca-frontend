"use client";

import HeaderSection from "@/components/Header/Section/HeaderSection";
import { ContentContainer, Main } from "./globalStyles";
import Footer from "@/components/Footer/Footer";

const Template = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ContentContainer>
        <HeaderSection />
        <Main id="root">{children}</Main>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Template;
