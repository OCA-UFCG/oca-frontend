"use client";

import { Wrapper } from "./globalStyles";

import Header from "@/components/Header/Header";
import Sponsors from "@/components/Sponsor/Section/Sponsors";
import TeamMembers from "@/components/TeamMember/Section/TeamMembers";

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <Sponsors />
      <TeamMembers />
    </Wrapper>
  );
}
