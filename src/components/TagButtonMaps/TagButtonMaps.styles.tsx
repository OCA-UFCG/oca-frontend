import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import Link from "next/link";

export const TagButton = styled.span<{ $active?: string; isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.green : theme.colors.black};
  padding: 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  font-size: 1.1rem;
  box-shadow: 0 0 4px #a3a3a3;
  border-radius: 2px;
  transition: 300ms;
  z-index: 0;
  box-sizing: border-box;
  background-color: #ffffff95;
  cursor: ${({ $active, isLoading }) =>
    isLoading ? "not-allowed" : $active === "true" ? "" : "pointer"};

  opacity: ${({ isLoading }) => (isLoading ? "0.6" : "1.0")};

  &:hover {
    transform: scale(${({ $active }) => $active !== "true" && "0.99"});
    color: ${({ theme }) => theme.colors.green};
    opacity: ${({ $active }) => $active !== "true" && "0.6"};
  }
`;

export const VisuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  align-items: center;
`;

export const VisuName = styled.h3<{ $active: string }>`
  align-self: flex-start;
  font-size: 1.1rem;
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.green : theme.colors.black};
`;

export const Description = styled.p<{ $active?: string }>`
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  max-height: ${({ $active }) => ($active === "true" ? "200px" : "0")};
  opacity: ${({ $active }) => ($active === "true" ? "1" : "0")};
  overflow: hidden;
  transition:
    max-height 1s ease,
    opacity 1s ease;
  margin: 0;
  margin-top: ${({ $active }) => ($active === "true" ? "1rem" : "0")};
  font-size: 0.9rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const VisuIcon = styled(Icon)<{ $active?: string }>`
  /* width: 30px; */
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.green : theme.colors.black};
`;

export const Divider = styled.div`
  height: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.black}20;
  margin: 0 1rem;
`;

export const LinkButton = styled(Link)<{ $active?: string }>`
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.green : theme.colors.black};
  cursor: pointer;
  /* width: 100%; */
  text-align: flex-end;
  transition: 0.3s;
  text-decoration: none;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;
