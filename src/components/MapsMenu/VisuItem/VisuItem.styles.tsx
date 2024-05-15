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
  gap: 0.5rem;
`;

export const Input = styled.input`
  &[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1rem;
    height: 1rem;
    border: 0.2rem solid currentColor;
    border-radius: 50%;
    transform: translateY(0.15rem);

    display: grid;
    place-content: center;
  }

  &[type="radio"]::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: CanvasText;
  }

  &[type="radio"]:checked::before {
    transform: scale(1);
  }

  &[type="radio"]:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
`;

export const Label = styled.label`
  font-size: 1rem;
`;

export const SubItemsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  margin: 0.75rem 0 0.75rem 0.5rem;
`;
