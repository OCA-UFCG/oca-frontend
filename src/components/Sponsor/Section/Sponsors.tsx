import { sponsorsContent } from "@/content/Sponsors";
import { SectionTitle } from "@/app/globalStyles";
import { SponsorsContainer, Wrapper } from "./Sponsors.styles";
import Sponsor from "../Sponsor";

const SponsorsSection = () => {
  return (
    <Wrapper id="sponsors">
      <SectionTitle variation="white">Parceiros</SectionTitle>
      <SponsorsContainer>
        {sponsorsContent
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((sponsor, index) => (
            <Sponsor key={index} data={sponsor} />
          ))}
      </SponsorsContainer>
    </Wrapper>
  );
};

export default SponsorsSection;
