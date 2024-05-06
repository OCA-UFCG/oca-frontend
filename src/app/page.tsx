"use client";

import { Wrapper } from "./globalStyles";
import HeaderSection from "@/components/Header/Section/HeaderSection";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Wrapper id="root">
        <HeaderSection />
        <SponsorsSection />
        <TeamMembersSection />
      </Wrapper>
      <Footer />
    </>
  );
}
