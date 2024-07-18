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
import { Icon } from "../Icon/Icon";

const TeamMember = ({ data }: { data: ITeamMember }) => {
  const { name, avatar, role, github, linkedin, lattes } = data;

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github" },
    { name: "linkedin", href: linkedin, icon: "linkedin" },
    { name: "lattes", href: lattes, icon: "lattes" },
  ];

  return (
    <Wrapper>
      <Avatar
        src={
          `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
          "avatar.svg"
        }
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
                <Medias target="_blank" key={index} title={name} href={href}>
                  <Icon id={icon} size={24} />
                </Medias>
              ),
          )}
        </Networks>
      </Details>
    </Wrapper>
  );
};

export default TeamMember;
