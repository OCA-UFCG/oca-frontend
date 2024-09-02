"use client";

import { SectionTitle } from "@/app/globalStyles";
import {
  SponsorsContainer,
  Wrapper,
  Header,
  Description,
  TierContainer,
  SubTitle,
} from "./Sponsors.styles";
import Sponsor from "../Sponsor";
import { ISponsor } from "@/utils/interfaces";

const SponsorsSection = ({
  sponsors,
}: {
  sponsors: { fields: ISponsor }[];
}) => {
  const tierSponsors: { [key: string]: ISponsor[] } = {};

  sponsors.forEach((sponsor: { fields: ISponsor }) => {
    if (!tierSponsors[sponsor.fields.tier]) {
      tierSponsors[sponsor.fields.tier] = [];
    }
    tierSponsors[sponsor.fields.tier].push(sponsor.fields);
  });

  return (
    <Wrapper id="sponsors">
      <Header>
        <SectionTitle>Patrocinadores</SectionTitle>
        <Description>
          O projeto é mantido por meio de patrocínios. Agradecemos a todos os
          nossos patrocinadores por acreditarem no nosso trabalho.
        </Description>
      </Header>
      {Object.keys(tierSponsors).map((tier) => (
        <TierContainer key={tier}>
          <SubTitle>{tier}</SubTitle>
          <SponsorsContainer>
            {tierSponsors[tier]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((sponsor, index) => (
                <Sponsor key={index} data={sponsor} />
              ))}
          </SponsorsContainer>
        </TierContainer>
      ))}
    </Wrapper>
  );
};

export default SponsorsSection;
