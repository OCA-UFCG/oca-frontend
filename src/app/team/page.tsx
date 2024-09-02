import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";

const TeamPage = async () => {
  const data = await getContent(["members"]);

  return (
    <Template>
      <TeamMembersSection teamMembers={data.members} />
    </Template>
  );
};

export default TeamPage;
