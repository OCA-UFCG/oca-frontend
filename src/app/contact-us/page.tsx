import Template from "@/templates/hubTemplate";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import ContactForm from "@/components/ContactForm/ContactForm";
import { getContent } from "@/utils/functions";

export const revalidate = 60;

const ContactUsPage = async () => {
  const { sectionHead } = await getContent(["sectionHead"]);
  const id = "contact-us";

  return (
    <Template>
      <SectionHeader id={id} sectionHead={sectionHead} />
      <ContactForm />
    </Template>
  );
};

export default ContactUsPage;
