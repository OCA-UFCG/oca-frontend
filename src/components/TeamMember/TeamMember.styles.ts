import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon/Icon";

export const ExpandIcon = styled(Icon)`
  position: absolute;
  color: ${({ theme }) => theme.colors.black};
  opacity: 0;
  z-index: 1;
  align-self: center;
  margin-top: 2.25rem;
  cursor: pointer;
`;

export const Avatar = styled(Image)`
  position: relative;
  border-radius: 50%;
  height: 6rem;
  width: 6rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  gap: 0.5rem;
  flex-direction: column;
  &:hover ${ExpandIcon} {
    opacity: 1;
    animation: pulse 0.5s;
  }
  &:hover ${Avatar} {
    opacity: 0.4;
    filter: blur(2px);
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  gap: 0.5rem;
  flex-direction: column;
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
  align-items: center;
`;

export const Medias = styled(Link)`
  transition: 0.2s;
  color: ${({ theme }) => theme.colors.black}90;
  &:hover {
    opacity: 0.6;
  }

  img {
    max-width: 1.75rem;
    max-height: 1.75rem;
  }
`;

export const InfoBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
