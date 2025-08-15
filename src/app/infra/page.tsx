import Template from "@/templates/hubTemplate";
import { Tabloid } from "./styles";
import InfraSection from "@/components/Infra/Infra";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { getContent } from "@/utils/contentful";
import { INFRA_PAGE_QUERY } from "@/utils/queries";
import { REVALIDATE } from "@/utils/constants";
import { IGallery, ISectionHeader } from "@/utils/interfaces";

export const revalidate = REVALIDATE;

interface ICollabInterface {
  infrastructureCollection: { items: IGallery[] };
  sectionHeadCollection: { items: ISectionHeader[] };
}

const TeamPage = async () => {
  const {
    infrastructureCollection: infrastructure,
    sectionHeadCollection: sectionHead,
  }: ICollabInterface = await getContent(INFRA_PAGE_QUERY);

  const id = "infra";

  return (
    <Template>
      <Tabloid>
        <SectionHeader id={id} sectionHead={sectionHead.items} />
        <InfraSection gallery={infrastructure.items} />
      </Tabloid>
    </Template>
  );
};

export default TeamPage;
