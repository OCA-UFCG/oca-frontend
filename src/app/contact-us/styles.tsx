import styled from "styled-components";
import { Icon as DefaultIcon } from "@/components/Icon/Icon";

export const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  align-self: center;
  width: 100%;
  max-width: 850px;
  margin: 3rem 0 2rem;
`;

export const SubTitle = styled.h2`
  font-size: 1rem;
  color: #00000080;
  margin-bottom: 1rem;
  align-self: center;
  text-align: center;
  padding: 0 1rem;
`;

export const FormularyWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 70%;
`;

export const FormularyLabel = styled.label`
  display: flex;
  gap: 1rem;
  align-items: left;
  flex-direction: column;
`;

export const FormularyInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  min-height: 25px;
`;

export const FormularyTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  min-height: 200px;
`;

export const InvalidForm = styled.button`
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: not-allowed;
  max-width: 120px;
  align-self: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
`;

export const SendButton = styled(InvalidForm)`
  cursor: pointer;
  opacity: 1;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export const TextInButton = styled.h1`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const Icon = styled(DefaultIcon)`
  color: ${({ theme }) => theme.colors.white};
`;

export const LoadingIcon = styled(Icon)`
  animation: spin 1.5s linear infinite;
  color: ${({ theme }) => theme.colors.white};
`;
