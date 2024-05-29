import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div<{ disabled: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  ${({ disabled }) =>
    disabled === "true" &&
    `
  opacity: 0.6;
  cursor: not-allowed;
  `};
  padding: 0 0.25rem;
  box-sizing: border-box;
`;

export const CalendarImage = styled(Image)`
  height: fit-content;
`;

export const DateInfo = styled.p`
  width: max-content;
  text-wrap: nowrap;
  margin: 0;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  /* z-index: 0; */
  padding-inline: 0.25rem;

  input[type="range"] {
    height: 22px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.black}70;
    border-radius: 48px;
    border: 0px solid ${({ theme }) => theme.colors.black};
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.black};
    border: 0px solid #b3b5e3;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -4px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: ${({ theme }) => theme.colors.black};
  }
  &::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.black};
    border-radius: 48px;
    border: 0px solid ${({ theme }) => theme.colors.black};
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.black};
    border: 0px solid #b3b5e3;
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.orange};
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.black};
    border: 0px solid ${({ theme }) => theme.colors.black};
    border-radius: 96px;
    box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.black};
  }
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.black};
    border: 0px solid ${({ theme }) => theme.colors.black};
    border-radius: 96px;
    box-shadow: 0px 0px 0px ${({ theme }) => theme.colors.black};
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.black};
    height: 16px;
    width: 16px;
    border-radius: 16px;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.black};
  }
  &:focus::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.black};
  }

  &[type="range"]:disabled {
    cursor: not-allowed;
  }
`;

export const DateList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  transform: translate(-10px, 3px);
  opacity: 0.7;
  z-index: -2;
`;

export const DateItem = styled.li`
  position: relative;
  list-style: none;
  width: 2px;
  height: 8px;
  border-radius: 2px;
  margin: 0 7px;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.black};
  pointer-events: none;
`;
