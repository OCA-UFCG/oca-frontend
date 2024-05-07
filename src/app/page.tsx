"use client";

import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import AboutSection from "@/components/AboutSection/AboutSection";
import { LogoSection, OcaImage } from "./globalStyles";
import OcaLogo from "@/../public/logo-oca-full.svg";

export default function Home() {
  return (
    <>
      <LogoSection>
        <OcaImage src={OcaLogo} alt="The oca logo" />
      </LogoSection>
      <AboutSection />
      <SponsorsSection />
      <TeamMembersSection />
    </>
  );
}
