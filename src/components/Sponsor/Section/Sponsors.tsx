"use client";

import { SectionTitle } from "@/app/globalStyles";
import { SponsorsContainer, Wrapper } from "./Sponsors.styles";
import Sponsor from "../Sponsor";
import { useContext, useEffect, useState } from "react";
import { CMSContext } from "@/contexts/ContentProvider";
import { ISponsor } from "@/utils/interfaces";

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState([]);
  const { loadData } = useContext(CMSContext);

  useEffect(() => {
    loadData("sponsors", setSponsors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper id="sponsors">
      <SectionTitle variation="white">Parceiros</SectionTitle>
      <SponsorsContainer>
        {sponsors
          .sort(
            (
              { fields: a }: { fields: ISponsor },
              { fields: b }: { fields: ISponsor },
            ) => a.name.localeCompare(b.name),
          )
          .map((sponsor: { fields: ISponsor }, index) => (
            <Sponsor key={index} data={sponsor.fields} />
          ))}
      </SponsorsContainer>
    </Wrapper>
  );
};

export default SponsorsSection;
