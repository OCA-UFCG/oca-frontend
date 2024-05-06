import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LogoImage = styled(Image)`
  width: fit-content;
  height: fit-content;
  max-width: 6rem;
  border-radius: 50%;
`;
