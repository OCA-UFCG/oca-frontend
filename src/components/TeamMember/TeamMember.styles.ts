import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  gap: 1rem;

`;

export const Avatar = styled(Image)`
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

export const Description = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #858585;
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
