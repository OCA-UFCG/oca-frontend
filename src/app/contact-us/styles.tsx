import styled from "styled-components";

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

export const SendInput = styled.input`
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.3s;
  max-width: 100px;
  align-self: center;
  &:hover {
    opacity: 0.7;
  }
`;
