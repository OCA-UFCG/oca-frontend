"use client";

import HeaderSection from "@/components/Header/Section/HeaderSection";
import { ContentContainer, Main } from "@/app/globalStyles";
import Footer from "@/components/Footer/Footer";

const HubTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderSection />
      <ContentContainer>
        <Main id="root">{children}</Main>
        <Footer />
      </ContentContainer>
    </>
  );
};

export default HubTemplate;
