import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon/Icon";

export const Checkbox = styled.input``;

export const ExpandIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.black};
  align-self: center;
  transition: 300ms;
  transform: rotate(180deg);

  ${Checkbox}:checked ~ & {
    transform: rotate(0deg);
  }
`;

export const AvatarFrame = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const Avatar = styled(Image)`
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 10;
  object-fit: cover;
  height: auto;
  box-shadow: inset 0 0 5px #cdcdcd;
  transition: 300ms;
  background-color: #cdcdcd;
`;

export const Wrapper = styled.label<{ active: string }>`
  cursor: ${({ active }) => (active === "false" ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  width: auto;
  flex-direction: column;
  break-inside: avoid;
  max-width: 18rem;
  background-color: white;
  margin-bottom: 2rem;

  & ${ExpandIcon} {
    opacity: ${({ active }) => (active !== "false" ? "0.5" : "0.3")};
  }

  &:hover ${ExpandIcon} {
    opacity: ${({ active }) => active !== "false" && "1"};
  }

  &:hover ${Avatar} {
    transform: ${({ active }) => active !== "false" && "scale(1.1)"};
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
  gap: 0.5rem;
  flex-direction: column;
  box-shadow: 0 0 3px #cdcdcd;
`;

export const MainInfoContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

export const Name = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Role = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
`;

export const MoreInfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.75rem;
  transition: height 300ms;

  overflow: hidden;
  padding: 0.25rem 0 0.5rem;

  ${Checkbox}:checked ~ & {
    animation: close 500ms ease-in-out forwards;
  }

  :not(Checkbox:checked) ~ & {
    animation: open 500ms ease-in-out forwards;
  }
`;

export const Institution = styled.span`
  font-size: 13px;
`;

export const FieldWorkContainer = styled.div``;

export const FieldWorkTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: bold;
  color: #222;
`;
export const FieldWorkTitle = styled.span`
  font-size: 14px;
`;

export const FieldWorkWrapper = styled.div``;

export const FieldWork = styled.span`
  font-size: 13px;
`;

export const Networks = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0;
`;

export const Medias = styled(Link)`
  display: flex;
  transition: 0.2s;
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    transform: scale(1.1);
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
