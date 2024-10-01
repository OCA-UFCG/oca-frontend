import { Section as DefaultSection } from "@/app/globalStyles";
import styled from "styled-components";

export const Section = styled(DefaultSection)`
  align-items: center;
`;

export const TeamMembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
  //column-count: 6;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
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
