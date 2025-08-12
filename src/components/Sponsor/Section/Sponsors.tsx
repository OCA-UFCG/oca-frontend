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

const NO_VALUE = "undefined";

const SponsorsSection = ({
  sponsors,
  sectionHead,
}: {
  sectionHead: ISectionHeader[];
  sponsors: ISponsor[];
}) => {
  const tierSponsors: { [key: string]: ISponsor[] } = {};

  sponsors.forEach((sponsor: ISponsor) => {
    const sponsorKey = sponsor.tier ? sponsor.tier : NO_VALUE;

    if (!tierSponsors[sponsorKey]) {
      tierSponsors[sponsorKey] = [];
    }

    tierSponsors[sponsorKey].push(sponsor);
  });

  return (
    <Wrapper id="sponsors">
      <SectionHeader id="sponsors" sectionHead={sectionHead} />
      {Object.keys(tierSponsors)
        .sort((a, b) => b.localeCompare(a))
        .map((tier) => (
          <TierContainer key={tier}>
            {tier && tier !== NO_VALUE && <SubTitle>{tier}</SubTitle>}
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
