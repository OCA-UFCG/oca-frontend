"use client";

import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import AboutSection from "@/components/AboutSection/AboutSection";

export default function Home() {
  return (
    <>
      <AboutSection />
      <SponsorsSection />
      <TeamMembersSection />
    </>
  );
}
