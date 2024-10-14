import { ITeamMember, ISocialMedia } from "@/utils/interfaces";
import {
  Wrapper,
  Avatar,
  Name,
  Role,
  Networks,
  InfoContainer,
  Medias,
  MoreInfoContainer,
  Institution,
  FieldWork,
  FieldWorkContainer,
  FieldWorkTitle,
  FieldWorkTitleContainer,
  MainInfoContainer,
  FieldWorkWrapper,
  Checkbox,
  AvatarFrame,
  AvatarCircle,
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

  const firstMedia = socialMedias.find((media) => media.href);

  return (
    <Wrapper
      htmlFor={name.replace(" ", "_").toLowerCase()}
      // eslint-disable-next-line lines-around-comment
      //active={(institution || fieldWork)?.toString() || "false"}
      active={"true"}
    >
      <AvatarFrame>
        <AvatarCircle href={firstMedia?.href || ""} target="_blank">
          <Avatar
            src={
              `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
              "avatar.svg"
            }
            title={firstMedia?.href}
            alt="Profile picture"
            width={300}
            height={300}
          />
        </AvatarCircle>
      </AvatarFrame>

      <InfoContainer>
        <MainInfoContainer>
          <Checkbox
            id={name.replace(" ", "_").toLowerCase()}
            type="checkbox"
            checked={false}
            defaultChecked={true}
            hidden
            readOnly
            disabled={!(institution || fieldWork)}
          />
          <Name>{name}</Name>
          <Role>{role}</Role>
          {(institution || fieldWork) && (
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
                      <FieldWork key={index}>
                        {field}
                        {index != fieldWork.length - 1 && ", "}
                      </FieldWork>
                    ))}
                  </FieldWorkWrapper>
                </FieldWorkContainer>
              )}
            </MoreInfoContainer>
          )}
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
          {/*<ExpandIcon id="arrow-head" size={16} />*/}
        </MainInfoContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default TeamMember;
