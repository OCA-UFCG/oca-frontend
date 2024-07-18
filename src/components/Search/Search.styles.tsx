import styled from "styled-components";
import Image from "next/image";
import { Icon } from "../Icon/Icon";

export const SearchWrapper = styled.div`
  border-radius: 6px;
  z-index: 1000;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  background-color: white;
  padding: 1rem;
  max-width: 25rem;
  margin: 0 1rem;
  margin-top: 6rem;
`;

export const InputWrapper = styled.label`
  width: 100%;
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

export const ResultFollowIcon = styled(Image)`
  cursor: pointer;
  width: 1rem;
  height: auto;
  opacity: 0;
  transition: 0.25s;
`;

export const LocationWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  border-radius: 4px;
  transition: 0.2s;
  &:hover {
    background-color: #f6f6f6;
  }
  border: 1px solid #e0e0e0;
  &:hover ${ResultFollowIcon} {
    opacity: 0.8;
  }
`;

export const InputCloseImage = styled(Image)`
  cursor: not-allowed;
  width: 0.75rem;
  height: auto;
  margin: auto 0.5rem;
  opacity: 0.3;
  &:hover {
    opacity: 0.5;
  }
  transition: 0.3s;
`;

export const InputComponent = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  font-size: 0.9rem;
  outline: none;
  &:not(:placeholder-shown) ~ ${InputCloseImage} {
    opacity: 1;
    cursor: pointer;
  }
`;

export const NoResultsFind = styled.p`
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.6;
  align-self: center;
`;

export const SearchImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;
  width: 2rem;
  height: auto;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const InputSearchImage = styled(Image)`
  width: 1.5rem;
  height: auto;
  &:hover {
    opacity: 0.5;
  }
  transition: 0.3s;
`;

export const SearchBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

export const SectionTitle = styled.h3`
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0;
`;

export const LocationItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CityName = styled.h4`
  font-size: 0.9rem;
  margin: 0;
`;

export const CityStateName = styled.p`
  font-size: 0.7rem;
  margin: 0;
  opacity: 0.6;
  line-height: 0.8rem;
`;

export const Loading = styled(Icon)`
  animation: spin 1.5s linear infinite;
  width: 1rem;
  height: 2rem;
  align-self: center;
  opacity: 0.6;
`;
