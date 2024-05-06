import { sponsorsContent } from "@/content/Sponsors";
import { Section, SectionTitle } from "@/app/globalStyles";
import { SponsorsContainer } from "./Sponsors.styles";
import Sponsor from "../Sponsor";

const SponsorsSection = () => {
  return (
    <Section id="sponsors">
      <SectionTitle>Parceiros</SectionTitle>
      <SponsorsContainer>
        {sponsorsContent.map((sponsor, index) => (
          <Sponsor key={index} data={sponsor} />
        ))}
      </SponsorsContainer>
    </Section>
  );
};

export default SponsorsSection;
