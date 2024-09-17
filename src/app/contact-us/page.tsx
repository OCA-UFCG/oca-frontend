import Template from "@/templates/hubTemplate";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import ContactForm from "@/components/ContactForm/ContactForm";
import { getContent } from "@/utils/functions";

export const revalidate = 60;

const ContactUsPage = async () => {
  const { sectionHead } = await getContent(["sectionHead"]);
  const id = "contact-us";

  const { fields } = sectionHead.find((head) => head.fields.id === id);

  const { title, subtitle } = fields;

  return (
    <Template>
      <SectionHeader title={title} subtitle={subtitle} />
      <ContactForm />
    </Template>
  );
};

export default ContactUsPage;
