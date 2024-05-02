import { TeamMemberInterface } from "@/interfaces/TeamMemberInterface";
import {
  Container,
  InfoContainer,
  LinksContainer,
  SocialMedia,
  Description,
  Avatar,
  Name,
} from "./TeamMember.styles";

const TeamMember = ({ data }: { data: TeamMemberInterface }) => {
  const { name, avatar, role, github, linkedin, lattes } = data;

  return (
    <Container>
      <Avatar src={avatar || "avatar.svg"} alt="Profile picture" />
      <InfoContainer>
        <Name>{name}</Name>
        <Description>{role}</Description>
        <LinksContainer>
          {github && (
            <SocialMedia target="_blank" href={github}>
              <img src="github.svg" alt="github" />
            </SocialMedia>
          )}
          {linkedin && (
            <SocialMedia target="_blank" href={linkedin}>
              <img src="linkedin.svg" alt="linkedin" />
            </SocialMedia>
          )}
          {lattes && (
            <SocialMedia target="_blank" href={lattes}>
              <img src="lattes.svg" alt="lattes" />
            </SocialMedia>
          )}
        </LinksContainer>
      </InfoContainer>
    </Container>
  );
};

export default TeamMember;
