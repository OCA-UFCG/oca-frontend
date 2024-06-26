import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const Wrapper = styled(Section)`
  padding: 1.5rem 0;
  background-color: ${({ theme }) => theme.colors.green};
  background-image: url("flower-background.png");
  background-repeat: repeat;
  background-size: 40rem;
`;

export const SponsorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    position: relative;
    justify-content: flex-start;
    align-items: center;
    max-width: calc(100vw);
    padding: 0 1rem 0.5rem 1rem;
    box-sizing: border-box;
    height: fit-content;
    flex-wrap: nowrap;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: hidden;
  }
`;
