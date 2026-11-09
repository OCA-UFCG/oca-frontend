import FAQSection from "@/components/FAQSection/FAQSection";
import Template from "@/app/(preview)/preview/_components/Template";
import { REVALIDATE } from "@/utils/constants";
import { getContent } from "@/utils/contentful";
import { IFAQ, ISectionHeader } from "@/utils/interfaces";
import { FAQ_PAGE_QUERY } from "@/utils/queries";

export const revalidate = REVALIDATE;

interface IFAQContent {
  faqCollection: { items: IFAQ[] };
  sectionHeadCollection: { items: ISectionHeader[] };
}

const FAQPage = async () => {
  const { faqCollection, sectionHeadCollection }: IFAQContent =
    await getContent(FAQ_PAGE_QUERY);

  return (
    <Template>
      <FAQSection
        sectionHead={sectionHeadCollection.items}
        FAQ={faqCollection.items}
      />
    </Template>
  );
};

export default FAQPage;
