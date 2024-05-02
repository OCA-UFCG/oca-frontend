import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 1rem;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SocialMedia = styled.a`
  transition: 0.2s;
  
  &:hover {
    opacity: 0.6;
  }
  
  img {
    max-width: 1.75rem;
    max-height: 1.75rem;
  }
`;
