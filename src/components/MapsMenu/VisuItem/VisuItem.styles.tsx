import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;

  gap: 0.5rem;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
`;

export const Input = styled.input`
  cursor: pointer;

  &[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;

    font: inherit;
    color: ${({ theme }) => theme.colors.black};
    width: 1rem;
    height: 1rem;

    border: 0.15rem solid ${({ theme }) => theme.colors.black};
    border-radius: 50%;

    display: grid;
    place-content: center;
  }

  &[type="radio"]:checked + label {
    color: ${({ theme }) => theme.colors.green};
    font-weight: bold;
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

export const Label = styled.label`
  font-size: 1rem;
  width: 100%;
`;

export const SubItemsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  margin: 0.75rem 0 0.75rem 0.5rem;
`;
