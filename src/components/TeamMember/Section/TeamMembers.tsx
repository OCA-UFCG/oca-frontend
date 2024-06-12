import { Section, SectionTitle } from "@/app/globalStyles";
import { TeamMembersContainer } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";
import { useContext, useEffect, useState } from "react";
import { CMSContext } from "@/contexts/ContentProvider";
import { Entry, EntrySkeletonType } from "contentful";
import { ITeamMember } from "@/utils/interfaces";

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState<
    Entry<EntrySkeletonType, undefined, string>[]
  >([]);
  const { loadData } = useContext(CMSContext);

  useEffect(() => {
    loadData("members", setTeamMembers);
  }, [loadData]);

  return (
    <Section full="false" id="teamMembers">
      <SectionTitle>Nossa equipe</SectionTitle>
      <TeamMembersContainer>
        {teamMembers.map((teamMember, i) => (
          <TeamMember
            key={i}
            data={teamMember.fields as unknown as ITeamMember}
          />
        ))}
      </TeamMembersContainer>
    </Section>
  );
};

export default TeamMembersSection;
