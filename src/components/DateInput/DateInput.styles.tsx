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
`;

export const CalendarImage = styled(Image)`
  height: fit-content;
  /* width: fit-content; */
`;

export const DateInfo = styled.p`
  width: max-content;
  text-wrap: nowrap;
  margin: 0;
`;

export const RangeInput = styled.input`
  width: 100%;

  &[type="range"]:disabled {
    cursor: not-allowed;
  }
`;
