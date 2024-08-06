import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import MapsSection from "@/components/MapsSection/MapsSection";
import CarouselSection from "@/components/CarouselSection/CarouselSection";

import Template from "@/templates/hubTemplate";

export default function Home() {
  return (
    <Template>
      <CarouselSection />
      <MapsSection />
      <PublicationsSection />
      <SponsorsSection />
      <TeamMembersSection />
    </Template>
  );
}
