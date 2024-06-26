"use client";

import OcaLogo from "@/../public/logo-oca-full.svg";
import { LogoSection, OcaImage } from "./globalStyles";

import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import AboutSection from "@/components/AboutSection/AboutSection";
import MapsSection from "@/components/MapsSection/MapsSection";

import Template from "@/templates/hubTemplate";

export default function Home() {
  return (
    <Template>
      <LogoSection>
        <OcaImage src={OcaLogo} alt="The oca logo" />
      </LogoSection>
      <AboutSection />
      <MapsSection />
      <PublicationsSection />
      <SponsorsSection />
      <TeamMembersSection />
    </Template>
  );
}
