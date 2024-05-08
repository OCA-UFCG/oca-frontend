import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 16rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-flow: column;
  }
`;

export const Avatar = styled(Image)`
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    align-items: center;
    height: 100%;
  }
`;

export const Name = styled.span`
  font-weight: bold;

  @media (max-width: 600px) {
    flex: 2;
    min-width: 7rem;
    text-align: center;
    font-size: 1rem;
  }
`;

export const Role = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export const Networks = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: end;
`;

export const Medias = styled(Link)`
  transition: 0.2s;
  &:hover {
    opacity: 0.6;
  }

  img {
    max-width: 1.75rem;
    max-height: 1.75rem;
  }
`;
