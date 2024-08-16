"use client";

import { SectionTitle } from "@/app/globalStyles";
import {
  SponsorsContainer,
  Wrapper,
  Description,
  TierContainer,
  SubTitle,
} from "./Sponsors.styles";
import Sponsor from "../Sponsor";
import { useContext, useEffect, useState } from "react";
import { CMSContext } from "@/contexts/ContentProvider";
import { ISponsor } from "@/utils/interfaces";

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const { loadData } = useContext(CMSContext);

  const tierSponsors: { [key: string]: ISponsor[] } = {};

  sponsors.forEach((sponsor: { fields: ISponsor }) => {
    if (!tierSponsors[sponsor.fields.tier]) {
      tierSponsors[sponsor.fields.tier] = [];
    }
    tierSponsors[sponsor.fields.tier].push(sponsor.fields);
  });

  console.log(tierSponsors);

  useEffect(() => {
    loadData("sponsors", setSponsors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper id="sponsors">
      <SectionTitle>Parceiros</SectionTitle>
      <Description>
        Os seguintes parceiros contribuem para o desenvolvimento do projeto.
      </Description>
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
