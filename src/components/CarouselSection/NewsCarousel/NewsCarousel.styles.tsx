import { Icon } from "@/components/Icon/Icon";
import Image from "next/image";
import styled from "styled-components";

export const ImageFramer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const NewsImage = styled(Image)`
  object-fit: cover;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  position: absolute;
  transition: 300ms;
`;

export const NewsWrapper = styled.a`
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.2rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;

  &:hover ${NewsImage} {
    transform: scale(1.05);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  border-radius: 0 0 0.2rem 0.2rem;
  pointer-events: none;
`;

export const RoundButton = styled(Icon)`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }
  transition: 0.3s;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1;
  align-self: center;
  margin-top: auto;
`;

export const NewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  z-index: 0;
  color: white;
  align-self: baseline;
  margin-top: auto;
  margin-bottom: 0.5rem;
  left: 0;
`;

export const LoadingBar = styled.div`
  width: 0;
  height: 0.5rem;
  background-color: #d4f8af;
  z-index: 0;
  align-self: baseline;
  animation: expandWidth 7s linear forwards;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0 0 0.2rem 0.2rem;
`;

export const LoadingIcon = styled(Icon)`
  animation: spin 1.5s linear infinite;
  color: ${({ theme }) => theme.colors.green}60;
  font-size: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-height: 200px;
  max-width: 200px;
  border-radius: 50%;
  box-sizing: border-box;
`;
