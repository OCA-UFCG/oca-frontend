import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import TeamMembersSection from "@/components/TeamMember/Section/TeamMembers";
import Template from "@/templates/hubTemplate";
import { REVALIDATE } from "@/utils/constants";
import { getContent } from "@/utils/contentful";
import { ISectionHeader, ITeamMember } from "@/utils/interfaces";
import { TEAM_PAGE_QUERY, TEAM_PAGES_ID } from "@/utils/queries";

export const revalidate = REVALIDATE;

interface ITeamInterface {
  membersCollection: { items: ITeamMember[] };
  sectionHeadCollection: { items: ISectionHeader[] };
}

const TeamPage = async () => {
  const {
    membersCollection: { items: members },
    sectionHeadCollection: { items: sectionHead },
  }: ITeamInterface = await getContent(TEAM_PAGE_QUERY);

  return (
    <Template backThumb={true}>
      <SectionHeader id={TEAM_PAGES_ID[0]} sectionHead={sectionHead} />
      <TeamMembersSection teamMembers={members} />
    </Template>
  );
};

export default TeamPage;
