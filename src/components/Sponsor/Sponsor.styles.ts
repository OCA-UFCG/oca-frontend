import styled from "styled-components";
import Image from "next/image";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled(Image)`
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
`;
