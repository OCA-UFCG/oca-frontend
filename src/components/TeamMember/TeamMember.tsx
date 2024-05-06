import { ITeamMember, ISocialMedia } from "@/utils/interfaces";
import {
  Wrapper,
  Avatar,
  Details,
  Name,
  Role,
  Networks,
  Medias,
} from "./TeamMember.styles";

const TeamMember = ({ data }: { data: ITeamMember }) => {
  const { name, avatar, role, github, linkedin, lattes } = data;

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github.svg" },
    { name: "linkedin", href: linkedin, icon: "linkedin.svg" },
    { name: "lattes", href: lattes, icon: "lattes.svg" },
  ];

  return (
    <Wrapper>
      <Avatar
        src={avatar || "avatar.svg"}
        alt="Profile picture"
        width={50}
        height={50}
      />
      <Details>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <Networks>
          {socialMedias.map(
            ({ name, href, icon }: ISocialMedia, index: number) =>
              href && (
                <Medias target="_blank" key={index} href={href}>
                  <img src={icon} alt={name} />
                </Medias>
              )
          )}
        </Networks>
      </Details>
    </Wrapper>
  );
};

export default TeamMember;
