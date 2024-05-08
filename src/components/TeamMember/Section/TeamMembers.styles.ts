import styled from "styled-components";

export const TeamMembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 2rem 1rem;

  @media screen and (max-width: 600px) {
    justify-content: space-between;
    align-items: stretch;
    height: max-content;
    width: 100%;
    box-sizing: border-box;
    flex-wrap: nowrap;
    overflow: scroll;
  }
`;
