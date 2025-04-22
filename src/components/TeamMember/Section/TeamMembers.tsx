"use client";

import { TeamMembersContainer, Section } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";
import { ITeamMember } from "@/utils/interfaces";
import { getPriority } from "../../../utils/functions";

const TeamMembersSection = ({
  teamMembers,
}: {
  teamMembers: { fields: ITeamMember }[];
}) => {
  return (
    <Section $full="false" id="teamMembers">
      <TeamMembersContainer>
        {teamMembers
          .sort(
            (
              { fields: a }: { fields: ITeamMember },
              { fields: b }: { fields: ITeamMember },
            ) => {
              const priorityA = getPriority(a.role);
              const priorityB = getPriority(b.role);

              const aCombined = `${priorityA} ${a.role} ${a.name}`;
              const bCombined = `${priorityB} ${b.role} ${b.name}`;

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
