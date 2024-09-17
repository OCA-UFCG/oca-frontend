import Template from "@/templates/hubTemplate";
import { Tabloid } from "./styles";
import InfraSection from "@/components/Infra/Infra";
import { getContent } from "@/utils/functions";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

export const revalidate = 60;

const TeamPage = async () => {
  const { infrastructure, sectionHead } = await getContent([
    "infrastructure",
    "sectionHead",
  ]);
  const id = "infra";

  return (
    <Template>
      <Tabloid>
        <SectionHeader id={id} sectionHead={sectionHead} />
        <InfraSection gallery={infrastructure} />
      </Tabloid>
    </Template>
  );
};

export default TeamPage;
