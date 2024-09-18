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
    width: fit-content;
  }
`;

export const TierContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const SubTitle = styled.h2`
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
`;
