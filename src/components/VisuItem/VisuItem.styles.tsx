"use client";

import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
`;

export const LoadingIcon = styled(Icon)<{ loading: boolean }>`
  opacity: 0.7;
  cursor: not-allowed;
  animation: spin 1s linear infinite;
  display: ${({ loading }) => (Boolean(loading) ? "block" : "none")};
`;

export const Input = styled.input`
  cursor: pointer;

  &:disabled,
  &:disabled ~ label {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[type="radio"] {
    transition: 0.3s;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    font: inherit;
    color: ${({ theme }) => theme.colors.black};
    width: max-content;
    height: max-content;
    padding: 2px;
    border: 0.15rem solid ${({ theme }) => theme.colors.black};
    border-radius: 50%;
    transform: translateY(0.05rem);
    display: grid;
    place-content: center;
  }

  &[type="radio"]:checked + label {
    color: ${({ theme }) => theme.colors.green};
  }

  &[type="radio"]:checked {
    border: 0.15rem solid ${({ theme }) => theme.colors.green};
  }

  &[type="radio"]::before {
    content: "";
    width: 0.51rem;
    height: 0.51rem;
    border-radius: 50%;
    transition: 120ms transform ease-in-out;
    background-color: transparent;
  }

  &[type="radio"]:checked::before {
    background-color: ${({ theme }) => theme.colors.green};
    transform: scale(1);
  }
`;

export const Label = styled.label<{ isloading: boolean }>`
  font-size: 1rem;
  width: 100%;
  transition: 0.3s;
  cursor: ${({ isloading }) =>
    Boolean(isloading) ? "not-allowed" : "pointer"};
  opacity: ${({ isloading }) => (Boolean(isloading) ? "0.7" : "1")};
`;

export const SubItemsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  margin: 0.75rem 0 0.75rem 0.5rem;
`;

export const InfoContainer = styled.div`
  /* margin-right: 0.45rem; */
`;

export const QuestionMarkIcon = styled(Icon)`
  max-width: 1rem;
  height: fit-content;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transform: scale(0.97);
  }
`;
