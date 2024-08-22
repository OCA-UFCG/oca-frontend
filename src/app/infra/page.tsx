"use client";

import Template from "@/templates/hubTemplate";
import { SectionTitle } from "../globalStyles";
import { SubTitle, Tabloid } from "./styles";
import InfraSection from "@/components/Infra/Infra";

const TeamPage = () => (
  <Template>
    <Tabloid>
      <SectionTitle>A infraestrutura do Observatório</SectionTitle>
      <SubTitle>
        Essa é a infraestrutura que temos distribuído ao longo de toda a
        Caatinga.
      </SubTitle>
      <InfraSection />
    </Tabloid>
  </Template>
);

export default TeamPage;
