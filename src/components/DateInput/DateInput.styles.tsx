import styled from "styled-components";

export const Wrapper = styled.div<{ disabled: string }>`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  align-items: center;
  justify-content: space-around;
  ${({ disabled }) =>
    disabled === "true" &&
    `
  opacity: 0.6;
  cursor: not-allowed;
  `};
  padding: 0 0.25rem;
  box-sizing: border-box;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 2rem;
`;

export const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  height: 0.25rem;

  input[type="range"] {
    height: 22px;
    -webkit-appearance: none;
    width: 100%;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.black}70;
    border-radius: 48px;
  }

  &::-webkit-slider-thumb {
    height: 12px;
    width: 12px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
    margin-top: -4px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.black};
    border-radius: 48px;
  }

  &::-moz-range-thumb {
    height: 12px;
    width: 12px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  /* height: 1.5rem; */

  position: relative;
  opacity: 0.7;
`;

export const Divider = styled.hr`
  border-bottom: 1px solid #000;
  transition: 300ms width ease-in-out;
  opacity: 0;
  width: 0px;
  margin: 0;
`;

export const DateSpan = styled.p<{ isCurrent: string; active: string }>`
  font-size: 12px;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  margin-top: 0.25rem;
  pointer-events: ${({ active }) => (active !== "true" ? "all" : "none")};

  &:hover {
    font-weight: bold;
  }

  & + ${Divider} {
    width: ${({ isCurrent }) => isCurrent === "true" && "100%"};
    opacity: ${({ isCurrent }) => isCurrent === "true" && "1"};
  }

  &:hover + ${Divider} {
    width: 100%;
    opacity: 1;
  }
`;
