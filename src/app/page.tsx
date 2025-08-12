import PublicationsSection from "@/components/Publication/Section/Publications";
import SponsorsSection from "@/components/Sponsor/Section/Sponsors";
import MapsSection from "@/components/MapsSection/MapsSection";

import Template from "@/templates/hubTemplate";
import AboutHomeSection from "@/components/AboutHomeSection/AboutHomeSection";
import { MapTiffProvider } from "@/contexts/MapContext";
import { Suspense } from "react";
import FAQSection from "@/components/FAQSection/FAQSection";
import { REVALIDATE } from "@/utils/constants";
import { getContent } from "@/utils/contentful";
import { MAIN_PAGE_QUERY } from "@/utils/queries";
import {
  IAboutSection,
  IEEInfo,
  IFAQ,
  IPublication,
  ISectionHeader,
  ISponsor,
} from "@/utils/interfaces";

export const revalidate = REVALIDATE;

interface IMainContent {
  aboutCollection: { items: IAboutSection[] };
  sectionHeadCollection: { items: ISectionHeader[] };
  tiffInfoCollection: { items: IEEInfo[] };
  publicationsCollection: { items: IPublication[] };
  sponsorsCollection: { items: ISponsor[] };
  faqCollection: { items: IFAQ[] };
}

export default async function Home() {
  const {
    aboutCollection: about,
    sectionHeadCollection: sectionHead,
    tiffInfoCollection: tiffInfo,
    publicationsCollection: publications,
    sponsorsCollection: sponsors,
    faqCollection: FAQ,
  }: IMainContent = await getContent(MAIN_PAGE_QUERY);

  return (
    <Template>
      <AboutHomeSection
        sectionHead={sectionHead.items}
        content={about.items[0]}
      />
      <Suspense>
        <MapTiffProvider tiffs={tiffInfo.items}>
          <MapsSection sectionHead={sectionHead.items} />
        </MapTiffProvider>
      </Suspense>
      <PublicationsSection
        sectionHead={sectionHead.items}
        publications={publications.items}
      />
      <SponsorsSection
        sponsors={sponsors.items}
        sectionHead={sectionHead.items}
      />
      <FAQSection sectionHead={sectionHead.items} FAQ={FAQ.items} />
    </Template>
  );
}
