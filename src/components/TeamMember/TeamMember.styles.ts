import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  gap: 0.5rem;
  flex-direction: column;
`;

export const Avatar = styled(Image)`
  border-radius: 50%;
  height: 6rem;
  width: 6rem;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 1.1rem;

  @media (max-width: 600px) {
    flex: 2;
    min-width: 7rem;
    text-align: center;
    font-size: 1rem;
    max-width: 8rem;
  }
`;

export const Role = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};

  @media (max-width: 600px) {
    flex: 2;
    min-width: 7rem;
    text-align: center;
    font-size: 0.8rem;
  }
`;

export const Networks = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: end;
`;

export const Medias = styled(Link)`
  transition: 0.2s;
  color: ${({ theme }) => theme.colors.green};
  &:hover {
    opacity: 0.6;
  }

  img {
    max-width: 1.75rem;
    max-height: 1.75rem;
  }
`;
