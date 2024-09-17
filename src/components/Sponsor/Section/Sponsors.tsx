"use client";

import {
  SponsorsContainer,
  Wrapper,
  TierContainer,
  SubTitle,
} from "./Sponsors.styles";
import Sponsor from "../Sponsor";
import { ISectionHeader, ISponsor } from "@/utils/interfaces";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

const SponsorsSection = ({
  sponsors,
  sectionHead,
}: {
  sectionHead: ISectionHeader[];
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
      <SectionHeader id="sponsors" sectionHead={sectionHead} />
      {Object.keys(tierSponsors).map((tier) => (
        <TierContainer key={tier}>
          {tier && tier !== "undefined" && <SubTitle>{tier}</SubTitle>}
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
