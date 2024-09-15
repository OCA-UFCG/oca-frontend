import CollabTable from "@/components/CollabTable/CollabTable";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import { ContentWrapper, Title } from "./styles";

export const revalidate = 60;

const About = async () => {
  const { collaborators: content } = await getContent(["collaborators"]);

  return (
    <Template>
      <ContentWrapper>
        <Title>Colaboradores do Observatório da Caatinga</Title>
        <CollabTable content={content} />
      </ContentWrapper>
    </Template>
  );
};

export default About;
