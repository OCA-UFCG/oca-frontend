import HeaderSection from "@/components/Header/Section/HeaderSection";
import { Main } from "@/app/globalStyles";
import Footer from "@/components/Footer/Footer";

const HubTemplate = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HeaderSection />
      <Main id="root">{children}</Main>
      <Footer />
    </>
  );
};

export default HubTemplate;
