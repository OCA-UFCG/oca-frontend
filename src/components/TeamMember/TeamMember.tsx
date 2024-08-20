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
  InfoBackground,
} from "./TeamMember.styles";
import { useState } from "react";
import { Icon } from "../Icon/Icon";
import ExpandedInfo from "./ExpandedInfo/ExpandedInfo";

const TeamMember = ({ data }: { data: ITeamMember }) => {
  const { name, avatar, role, github, linkedin, lattes } = data;

  const [expanded, setExpanded] = useState(false);

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github", size: 24 },
    { name: "linkedin", href: linkedin, icon: "linkedin", size: 24 },
    { name: "lattes", href: lattes, icon: "lattes", size: 24 },
  ];

  const setExpandedHandler = () => setExpanded(!expanded);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Wrapper>
      {expanded && (
        <InfoBackground onClick={setExpandedHandler}>
          <div onClick={stopPropagation}>
            <ExpandedInfo data={data} onClose={setExpandedHandler} />
          </div>
        </InfoBackground>
      )}
      <InfoContainer onClick={setExpandedHandler}>
        <ExpandIcon id="expand" size={24} />
        <Avatar
          src={
            `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
            "avatar.svg"
          }
          alt="Profile picture"
          width={160}
          height={90}
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
