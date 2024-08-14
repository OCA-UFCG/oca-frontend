import { ITeamMember, ISocialMedia } from "@/utils/interfaces";
import {
  ExpandedInfoWrapper,
  Avatar,
  Name,
  Role,
  Identify,
  HeaderWrapper,
  SubTitle,
  SubTitleText,
  Icon,
  CloseIcon,
  BottomWrapper,
  Description,
  Networks,
  Medias,
} from "./ExpandedInfo.styles";

const ExpandedInfo = ({
  data,
  onClose,
}: {
  data: ITeamMember;
  onClose: () => void;
}) => {
  const {
    name,
    role,
    avatar,
    github,
    linkedin,
    lattes,
    fieldWork,
    institution,
  } = data;

  const socialMedias: ISocialMedia[] = [
    { name: "github", href: github, icon: "github", size: 24 },
    { name: "linkedin", href: linkedin, icon: "linkedin", size: 24 },
    { name: "lattes", href: lattes, icon: "lattes", size: 24 },
  ];

  return (
    <ExpandedInfoWrapper>
      <HeaderWrapper>
        <CloseIcon id="close" size={24} onClick={onClose} />
        <Avatar
          src={
            `https:${typeof avatar === "object" ? avatar.fields.file.url : avatar}` ||
            "avatar.svg"
          }
          alt="Profile picture"
          width={1600}
          height={900}
        />
        <Identify>
          <Name>{name}</Name>
          <Role>{role}</Role>
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
        </Identify>
      </HeaderWrapper>
      {(fieldWork || institution) && (
        <BottomWrapper>
          {fieldWork && (
            <>
              <SubTitle>
                <Icon id="bookIcon" size={24} />
                <SubTitleText>Area de Atuação</SubTitleText>
              </SubTitle>
              <Description>
                {fieldWork?.map((field, index: number) =>
                  index === 0 ? field : `, ${field}`,
                )}
              </Description>
            </>
          )}
          {institution && (
            <>
              <SubTitle>
                <Icon id="institutionIcon" size={24} />
                <SubTitleText>Instituição</SubTitleText>
              </SubTitle>
              <Description>{institution}</Description>
            </>
          )}
        </BottomWrapper>
      )}
    </ExpandedInfoWrapper>
  );
};

export default ExpandedInfo;
