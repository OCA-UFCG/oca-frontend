"use client";

import { Wrapper } from "./globalStyles";

import Header from "@/components/Header/Header";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <SponsorsSection />
      <TeamMembersSection />
    </Wrapper>
  );
}
