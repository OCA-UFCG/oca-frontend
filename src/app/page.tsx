import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import MapsSection from "@/components/MapsSection/MapsSection";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutHomeSection from "@/components/AboutHomeSection/AboutHomeSection";

export const revalidate = 60;

export default async function Home() {
  const {
    about: content,
    publications,
    sponsors,
    tiffInfo,
  } = await getContent([
    "news",
    "publications",
    "sponsors",
    "tiffInfo",
    "about",
  ]);

  return (
    <Template>
      <AboutHomeSection
        content={content[0].fields?.about}
        photos={content[0].fields?.album}
      />
      <MapsSection tiffInfo={tiffInfo} />
      <PublicationsSection publications={publications} />
      <SponsorsSection sponsors={sponsors} />
    </Template>
  );
}
