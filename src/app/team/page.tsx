"use client";

import { TeamMembersWrapper } from "./styles";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import Template from "@/templates/hubTemplate";

const TeamPage = () => (
  <Template>
    <TeamMembersWrapper>
      <TeamMembersSection />
    </TeamMembersWrapper>
  </Template>
);

export default TeamPage;
