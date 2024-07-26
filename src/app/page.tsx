import { LogoSection, OcaImage } from "./globalStyles";

import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import AboutSection from "@/components/AboutSection/AboutSection";
import MapsSection from "@/components/MapsSection/MapsSection";
import CarouselSection from "@/components/CarouselSection/CarouselSection";

import Template from "@/templates/hubTemplate";

export default function Home() {
  return (
    <Template>
      <LogoSection>
        <OcaImage id="logo-oca" />
      </LogoSection>
      <AboutSection />
      <CarouselSection />
      <MapsSection />
      <PublicationsSection />
      <SponsorsSection />
      <TeamMembersSection />
    </Template>
  );
}
