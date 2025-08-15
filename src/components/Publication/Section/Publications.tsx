"use client";

import { PublicationsContainer, Wrapper } from "./Publications.styles";
import Publication from "../Publication";
import { IPublication, ISectionHeader } from "@/utils/interfaces";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

const PublicationsSection = ({
  sectionHead,
  publications,
}: {
  sectionHead: ISectionHeader[];
  publications: IPublication[];
}) => (
  <Wrapper $full={"false"} id="publications">
    <SectionHeader id="publications" sectionHead={sectionHead} />
    <PublicationsContainer>
      {publications.map((publications, index) => (
        <Publication key={index} data={publications} />
      ))}
    </PublicationsContainer>
  </Wrapper>
);

export default PublicationsSection;
