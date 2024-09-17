import CollabTable from "@/components/CollabTable/CollabTable";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import { ContentWrapper, Wrapper } from "./styles";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

export const revalidate = 60;

const About = async () => {
  const { collaborators: content, sectionHead } = await getContent([
    "collaborators",
    "sectionHead",
  ]);

  const id = "collaborators";

  return (
    <Template backThumb={true}>
      <Wrapper>
        <SectionHeader id={id} sectionHead={sectionHead} />
        <ContentWrapper>
          <CollabTable content={content} />
        </ContentWrapper>
      </Wrapper>
    </Template>
  );
};

export default About;
