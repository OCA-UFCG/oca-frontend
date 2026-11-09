import Header from "@/app/(preview)/preview/_components/Header";
import { Main } from "@/app/globalStyles";
import Footer from "@/app/(preview)/preview/_components/Footer";
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
      <Header />
      <Main id="root" $backThumb={backThumb.toString()}>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default HubTemplate;
