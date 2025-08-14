import Template from "@/templates/hubTemplate";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import ContactForm from "@/components/ContactForm/ContactForm";
import { REVALIDATE } from "@/utils/constants";
import { ISectionHeader } from "@/utils/interfaces";
import { getContent } from "@/utils/contentful";
import { CONTACT_PAGE_QUERY, CONTACT_PAGES_ID } from "@/utils/queries";

export const revalidate = REVALIDATE;

interface IContactInterface {
  sectionHeadCollection: { items: ISectionHeader[] };
}

const ContactUsPage = async () => {
  const {
    sectionHeadCollection: { items: sectionHead },
  }: IContactInterface = await getContent(CONTACT_PAGE_QUERY);

  return (
    <Template>
      <SectionHeader id={CONTACT_PAGES_ID[0]} sectionHead={sectionHead} />
      <ContactForm />
    </Template>
  );
};

export default ContactUsPage;
