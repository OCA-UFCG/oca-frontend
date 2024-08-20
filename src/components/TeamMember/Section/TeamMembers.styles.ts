import { Section as DefaultSection } from "@/app/globalStyles";
import styled from "styled-components";

export const Section = styled(DefaultSection)`
  margin-top: 4rem;
  align-items: center;
`;

export const TeamMembersContainer = styled.div`
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
  column-count: 4;
  width: fit-content;

  @media screen and (max-width: 1200px) {
    column-count: 3;
  }

  @media screen and (max-width: 900px) {
    column-count: 2;
  }

  @media screen and (max-width: 600px) {
    column-count: 1;
  }
`;

export const SubTitleMembers = styled.h2`
  font-size: 1rem;
  color: #00000080;
  margin-bottom: 1rem;
  align-self: center;
  text-align: center;
  padding: 0 1rem;
`;
