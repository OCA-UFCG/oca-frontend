import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import MapsSection from "@/components/MapsSection/MapsSection";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutHomeSection from "@/components/AboutHomeSection/AboutHomeSection";
import { MapTiffProvider } from "@/contexts/MapContext";
import { Suspense } from "react";
import FAQSection from "@/components/FAQSection/FAQSection";

export const revalidate = 60;

export default async function Home() {
  const {
    about: content,
    publications,
    sponsors,
    tiffInfo,
    sectionHead,
    FAQ,
  } = await getContent([
    "news",
    "publications",
    "sponsors",
    "tiffInfo",
    "about",
    "FAQ",
    "sectionHead",
  ]);

  return (
    <Template>
      <AboutHomeSection
        sectionHead={sectionHead}
        content={content[0].fields?.about}
        photos={content[0].fields?.album}
      />
      <Suspense>
        <MapTiffProvider tiffs={tiffInfo}>
          <MapsSection sectionHead={sectionHead} />
        </MapTiffProvider>
      </Suspense>
      <PublicationsSection
        sectionHead={sectionHead}
        publications={publications}
      />
      <SponsorsSection sponsors={sponsors} sectionHead={sectionHead} />
      <FAQSection sectionHead={sectionHead} FAQ={FAQ} />
    </Template>
  );
}
