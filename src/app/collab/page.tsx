import CollabTable from "@/components/CollabTable/CollabTable";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import { ContentWrapper, Title, Wrapper } from "./styles";

export const revalidate = 60;

const About = async () => {
  const { collaborators: content } = await getContent(["collaborators"]);

  return (
    <Template backThumb={true}>
      <Wrapper>
        <Title>Colaboradores do Observatório da Caatinga</Title>
        <ContentWrapper>
          <CollabTable content={content} />
        </ContentWrapper>
      </Wrapper>
    </Template>
  );
};

export default About;
