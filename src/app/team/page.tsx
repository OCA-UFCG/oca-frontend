import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";

export const revalidate = 60;

const TeamPage = async () => {
  const { members, sectionHead } = await getContent(["members", "sectionHead"]);

  const id = "teamMembers";

  return (
    <Template backThumb={true}>
      <SectionHeader id={id} sectionHead={sectionHead} />
      <TeamMembersSection teamMembers={members} />
    </Template>
  );
};

export default TeamPage;
