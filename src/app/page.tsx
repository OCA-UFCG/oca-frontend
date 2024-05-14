"use client";

import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import AboutSection from "@/components/AboutSection/AboutSection";
import { LogoSection, OcaImage } from "./globalStyles";
import OcaLogo from "@/../public/logo-oca-full.svg";
import MapsSection from "@/components/MapsSection/MapsSection";

export default function Home() {
  return (
    <>
      <LogoSection>
        <OcaImage src={OcaLogo} alt="The oca logo" />
      </LogoSection>
      <AboutSection />
      <MapsSection />
      <PublicationsSection />
      <SponsorsSection />
      <TeamMembersSection />
    </>
  );
}
