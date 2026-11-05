"use client";

import styled, { css } from "styled-components";
import { Icon as DefaultIcon } from "@/components/Icon/Icon";

export const FormularyWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const field = css`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  font: inherit;
  font-size: 16px;
  color: ${({ theme }) => theme.colors["text-primary"]};

  &::placeholder {
    color: ${({ theme }) => theme.colors["text-muted"]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

export const FormularyInput = styled.input`
  ${field}
`;

export const FormularyTextArea = styled.textarea`
  ${field}
  min-height: 76px;
  resize: vertical;
`;

export const DinamicButton = styled.button<{ $isFormValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: ${({ $isFormValid }) => ($isFormValid ? "pointer" : "not-allowed")};
  opacity: ${({ $isFormValid }) => ($isFormValid ? 1 : 0.6)};
  transition: 0.3s;

  &:hover {
    opacity: ${({ $isFormValid }) => ($isFormValid ? 0.9 : 0.6)};
  }

  &.loading {
    cursor: not-allowed;
    opacity: 0.9;
  }

  &.success {
    background-color: ${({ theme }) => theme.colors["v-800"]};
    opacity: 1;
  }

  &.error {
    background-color: ${({ theme }) => theme.colors.wine};
    cursor: pointer;
    opacity: 1;
  }
`;

export const TextInButton = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors["primary-foreground"]};
`;

export const Icon = styled(DefaultIcon)`
  color: ${({ theme }) => theme.colors["primary-foreground"]};

  &.spin {
    animation: spin 1.5s linear infinite;
  }
`;
