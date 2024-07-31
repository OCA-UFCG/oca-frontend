import { Icon } from "@/components/Icon/Icon";
import Image from "next/image";
import styled from "styled-components";

export const NewsWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;

export const NewsImage = styled(Image)`
  object-fit: cover;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
  position: absolute;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
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
  background: none;
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
