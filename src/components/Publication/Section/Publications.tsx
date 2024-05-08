import { publicationsContent } from "@/content/Publication";
import { Section, SectionTitle } from "@/app/globalStyles";
import { PublicationsContainer } from "./Publications.styles";
import Publication from "../Publication";

const PublicationsSection = () => {
  return (
    <Section full={"false"} id="publications">
      <SectionTitle>Publicações do observatório</SectionTitle>
      <PublicationsContainer>
        {publicationsContent.map((publications, index) => (
          <Publication key={index} data={publications} />
        ))}
      </PublicationsContainer>
    </Section>
  );
};

export default PublicationsSection;
