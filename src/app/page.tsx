import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import MapsSection from "@/components/MapsSection/MapsSection";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";

export const revalidate = 60;

export default async function Home() {
  const { publications, sponsors, tiffInfo } = await getContent([
    "news",
    "publications",
    "sponsors",
    "tiffInfo",
  ]);

  return (
    <Template>
      <MapsSection tiffInfo={tiffInfo} />
      <PublicationsSection publications={publications} />
      <SponsorsSection sponsors={sponsors} />
    </Template>
  );
}
