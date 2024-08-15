import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Icon as DefaultIcon } from "@/components/Icon/Icon";

export const ExpandedInfoWrapper = styled.div`
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url("/flower-background.png");
  background-size: cover;
  z-index: 1;
  max-width: 35rem;
  margin: 1rem;
  padding: 1rem;
  position: relative;
  gap: 1rem;

  @media screen and (min-width: 500px) {
    min-width: 30rem;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled(Image)`
  border-radius: 3px;
  width: 14rem;
  height: 14rem;
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.black};
  box-sizing: border-box;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: auto;
  }
`;

export const NamedIdentify = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 500px) {
    align-items: center;
  }
`;

export const Identify = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 500px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
`;

export const Role = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export const Networks = styled.div`
  display: flex;
  gap: 0.8rem;
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

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Icon = styled(DefaultIcon)`
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
`;

export const CloseIcon = styled(DefaultIcon)`
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  cursor: pointer;
`;

export const SubTitleText = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;
