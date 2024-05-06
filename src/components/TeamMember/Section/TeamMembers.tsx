import { teamMembers } from "@/content/TeamMember";
import { Section, SectionTitle } from "@/app/globalStyles";
import { TeamMembersContainer } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";

const TeamMembersSection = () => {
  return (
    <Section id="teamMembers">
      <SectionTitle>Nossa equipe</SectionTitle>
      <TeamMembersContainer>
        {teamMembers.map((teamMember, i) => (
          <TeamMember key={i} data={teamMember} />
        ))}
      </TeamMembersContainer>
    </Section>
  );
};

export default TeamMembersSection;
