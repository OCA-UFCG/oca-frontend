import CollabTable from "@/components/CollabTable/CollabTable";
import Template from "@/templates/hubTemplate";
import { ContentWrapper, Wrapper } from "./styles";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { REVALIDATE } from "@/utils/constants";
import { COLLAB_PAGE_QUERY } from "@/utils/queries";
import { getContent } from "@/utils/contentful";
import { ISectionHeader, ITeamMember } from "@/utils/interfaces";

export const revalidate = REVALIDATE;

interface ICollabInterface {
  collaboratorsCollection: { items: ITeamMember[] };
  sectionHeadCollection: { items: ISectionHeader[] };
}

const About = async () => {
  const {
    collaboratorsCollection: content,
    sectionHeadCollection: sectionHead,
  }: ICollabInterface = await getContent(COLLAB_PAGE_QUERY);

  const id = "collaborators";

  return (
    <Template backThumb={true}>
      <Wrapper>
        <SectionHeader id={id} sectionHead={sectionHead.items} />
        <ContentWrapper>
          <CollabTable content={content.items} />
        </ContentWrapper>
      </Wrapper>
    </Template>
  );
};

export default About;
