import Template from "@/templates/hubTemplate";
import { SectionTitle } from "../globalStyles";
import { SubTitle, Tabloid } from "./styles";
import InfraSection from "@/components/Infra/Infra";
import { getContent } from "@/utils/functions";

export const revalidate = 60;

const TeamPage = async () => {
  const data = await getContent(["infrastructure"]);

  return (
    <Template>
      <Tabloid>
        <SectionTitle>A infraestrutura do Observatório</SectionTitle>
        <SubTitle>
          Essa é a infraestrutura que temos distribuído ao longo de toda a
          Caatinga.
        </SubTitle>
        <InfraSection gallery={data.infrastructure} />
      </Tabloid>
    </Template>
  );
};

export default TeamPage;
