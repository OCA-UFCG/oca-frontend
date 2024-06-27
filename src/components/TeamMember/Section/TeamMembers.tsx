import { Section, SectionTitle } from "@/app/globalStyles";
import { TeamMembersContainer } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";
import { useContext, useEffect, useState } from "react";
import { CMSContext } from "@/contexts/ContentProvider";
import { ITeamMember } from "@/utils/interfaces";

const TeamMembersSection = () => {
  const [teamMembers, setTeamMembers] = useState<{ fields: ITeamMember }[]>([]);
  const { loadData } = useContext(CMSContext);

  useEffect(() => {
    loadData("members", setTeamMembers);
  }, [loadData]);

  return (
    <Section full="false" id="teamMembers">
      <SectionTitle>Nossa equipe</SectionTitle>
      <TeamMembersContainer>
        {teamMembers
          .sort(
            (
              { fields: a }: { fields: ITeamMember },
              { fields: b }: { fields: ITeamMember },
            ) => {
              const aCombined = `${a.role} ${a.name}`;
              const bCombined = `${b.role} ${b.name}`;

              return aCombined.localeCompare(bCombined);
            },
          )
          .map((teamMember, i) => (
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
