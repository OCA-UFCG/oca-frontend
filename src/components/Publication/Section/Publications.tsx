"use client";

import { Section, SectionTitle } from "@/app/globalStyles";
import { PublicationsContainer } from "./Publications.styles";
import Publication from "../Publication";
import { IPublication } from "@/utils/interfaces";

const PublicationsSection = ({
  publications,
}: {
  publications: { fields: IPublication }[];
}) => (
  <Section full={"false"} id="publications">
    <SectionTitle>Publicações do observatório</SectionTitle>
    <PublicationsContainer>
      {publications.map((publications, index) => (
        <Publication
          key={index}
          data={publications.fields as unknown as IPublication}
        />
      ))}
    </PublicationsContainer>
  </Section>
);

export default PublicationsSection;
