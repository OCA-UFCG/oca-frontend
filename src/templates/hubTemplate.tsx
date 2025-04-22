import HeaderSection from "@/components/Header/Section/HeaderSection";
import { Main } from "@/app/globalStyles";
import Footer from "@/components/Footer/Footer";
import React, { ReactNode } from "react";

const HubTemplate = ({
  children,
  backThumb = false,
}: {
  children: ReactNode;
  backThumb?: boolean;
}) => {
  return (
    <>
      <HeaderSection />
      <Main id="root" $backThumb={backThumb.toString()}>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default HubTemplate;
