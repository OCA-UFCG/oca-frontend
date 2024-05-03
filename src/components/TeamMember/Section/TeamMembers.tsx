import { Container } from "./TeamMembers.styles";
import TeamMember from "../TeamMember";

const TeamMembers = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      avatar: "john-doe.jpg",
      role: "Software Engineer",
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      lattes: "lattes.com/johndoe",
    }, ]

  return (
    <Container>
      {teamMembers.map((teamMember) => (
        <TeamMember key={teamMember.id} data={teamMember} />
      ))}
    </Container>
  );
}

export default TeamMembers;