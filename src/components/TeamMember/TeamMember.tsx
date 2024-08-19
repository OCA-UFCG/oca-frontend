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
  MoreInfoContainer,
  Institution,
  FieldWork,
  FieldWorkContainer,
  FieldWorkTitle,
  FieldWorkTitleContainer,
  MainInfoContainer,
  FieldWorkWrapper,
  Checkbox,
} from "./TeamMember.styles";
import { Icon } from "../Icon/Icon";

const TeamMember = ({ data }: { data: ITeamMember }) => {
  const {
    name,
    avatar,
    role,
    github,
    linkedin,
    lattes,
    fieldWork,
    institution,
  } = data;

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github", size: 18 },
    { name: "linkedin", href: linkedin, icon: "linkedin", size: 18 },
    { name: "lattes", href: lattes, icon: "lattes", size: 18 },
  ];

  return (
    <Wrapper htmlFor={name.replace(" ", "_").toLowerCase()}>
      <Avatar
        src={
          `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
          "avatar.svg"
        }
        title={name}
        alt="Profile picture"
        width={160}
        height={90}
      />

      <InfoContainer>
        <MainInfoContainer>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </MainInfoContainer>

        <Checkbox
          id={name.replace(" ", "_").toLowerCase()}
          type="checkbox"
          defaultChecked={true}
          hidden
          disabled={!(institution && fieldWork)}
        />
        <MoreInfoContainer>
          {institution && <Institution>{institution}</Institution>}
          {fieldWork && (
            <FieldWorkContainer>
              <FieldWorkTitleContainer>
                <Icon id="bookIcon" size={16} />
                <FieldWorkTitle>Área de atuação</FieldWorkTitle>
              </FieldWorkTitleContainer>

              <FieldWorkWrapper>
                {fieldWork.map((field, index) => (
                  <>
                    <FieldWork key={index}>{field}</FieldWork>
                    {index != fieldWork.length - 1 && ", "}
                  </>
                ))}
              </FieldWorkWrapper>
            </FieldWorkContainer>
          )}
        </MoreInfoContainer>
        <Networks>
          {socialMedias.map(
            ({ href, icon, size }: ISocialMedia, index: number) =>
              href && (
                <Medias target="_blank" key={index} title={href} href={href}>
                  <Icon id={icon} size={size} />
                </Medias>
              ),
          )}
        </Networks>
        {(institution || fieldWork) && (
          <ExpandIcon
            expanded="expanded"
            id="arrow-head"
            width={16}
            height={12}
          />
        )}
      </InfoContainer>
    </Wrapper>
  );
};

export default TeamMember;
