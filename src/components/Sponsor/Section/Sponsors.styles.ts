import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const Wrapper = styled(Section)`
  padding: 1.5rem 0;
  background-repeat: repeat;
  background-size: 40rem;
`;

export const SponsorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  max-width: 1440px;

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

export const TierContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.black}80;
  text-align: center;
  padding: 0 1rem;
`;

export const SubTitle = styled.h2`
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
`;
