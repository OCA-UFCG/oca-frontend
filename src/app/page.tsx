import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import MapsSection from "@/components/MapsSection/MapsSection";
import CarouselSection from "@/components/CarouselSection/CarouselSection";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import { defaultNews } from "@/utils/constants";

export default async function Home() {
  const { news, publications, sponsors } = await getContent([
    "news",
    "publications",
    "sponsors",
  ]);

  return (
    <Template>
      <CarouselSection newsItems={news?.length === 0 ? defaultNews : news} />
      <MapsSection />
      <PublicationsSection publications={publications} />
      <SponsorsSection sponsors={sponsors} />
    </Template>
  );
}
