import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 20rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 20px;
`;

export const ProfileName = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

export const ProfileDescription = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const ProfileLinks = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  justify-content: space-between;

  img {
    width: 2rem;
    height: 2rem;
  }

  a {
    transition: 0.2s;
  }

  a:hover {
    transform: scale(1.1);
  }
`;

