import { ITeamMember, ISocialMedia } from "@/utils/interfaces";
import {
  Wrapper,
  Avatar,
  Name,
  Role,
  Networks,
  InfoContainer,
  Medias,
  ExpandIcon,
} from "./TeamMember.styles";
import { Icon } from "../Icon/Icon";

const TeamMember = ({ data }: { data: ITeamMember }) => {
  const { name, avatar, role, github, linkedin, lattes } = data;

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github", size: 24 },
    { name: "linkedin", href: linkedin, icon: "linkedin", size: 24 },
    { name: "lattes", href: lattes, icon: "lattes", size: 24 },
  ];

  return (
    <Wrapper>
      <InfoContainer>
        <ExpandIcon id="expand" size={24} />
        <Avatar
          src={
            `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
            "avatar.svg"
          }
          alt="Profile picture"
          width={50}
          height={50}
        />
        <Name>{name}</Name>
        <Role>{role}</Role>
      </InfoContainer>
      <Networks>
        {socialMedias.map(
          ({ name, href, icon, size }: ISocialMedia, index: number) =>
            href && (
              <Medias target="_blank" key={index} title={name} href={href}>
                <Icon id={icon} size={size} />
              </Medias>
            ),
        )}
      </Networks>
    </Wrapper>
  );
};

export default TeamMember;
