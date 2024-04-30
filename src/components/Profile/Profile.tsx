import { ProfileInterface } from "@/interfaces/ProfileInterface";
import {
  ProfileContainer,
  ProfileContent,
  ProfileLinks,
  ProfileDescription,
  ProfileImage,
  ProfileName,
} from "./Profile.styles";

const Profile = (data: ProfileInterface) => {
  return (
    <ProfileContainer>
      <ProfileImage src={data.photo || "avatar.png"} alt="Profile picture" />
      <ProfileContent>
        <ProfileName>{data.name}</ProfileName>
        <ProfileDescription>{data.role}</ProfileDescription>

        <ProfileLinks>
          {data.github ? (
            <a target="_blank" href={data.github}>
              <img src="github.svg" alt="github" />
            </a>
          ) : null}
          {data.linkedin ? (
            <a target="_blank" href={data.linkedin}>
              <img src="linkedin.svg" alt="linkedin" />
            </a>
          ) : null}
          {data.lattes ? (
            <a target="_blank" href={data.lattes}>
              <img src="lattes.svg" alt="lattes" />
            </a>
          ) : null}
        </ProfileLinks>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
