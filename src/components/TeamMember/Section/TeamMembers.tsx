"use client";

import { TeamMembersContainer, Section } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";
import { ITeamMember } from "@/utils/interfaces";
import { getPriority } from "../../../utils/functions";

const TeamMembersSection = ({
  teamMembers,
}: {
  teamMembers: ITeamMember[];
}) => {
  return (
    <Section $full="false" id="teamMembers">
      <TeamMembersContainer>
        {teamMembers
          .sort((a: ITeamMember, b: ITeamMember) => {
            const priorityA = getPriority(a.role);
            const priorityB = getPriority(b.role);

            const aCombined = `${priorityA} ${a.role} ${a.name}`;
            const bCombined = `${priorityB} ${b.role} ${b.name}`;

            return aCombined.localeCompare(bCombined);
          })
          .map((teamMember, i) => (
            <TeamMember key={i} data={teamMember} />
          ))}
      </TeamMembersContainer>
    </Section>
  );
};

export default TeamMembersSection;
