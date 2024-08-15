import styled from "styled-components";

export const PublicationsContainer = styled.div`
  column-count: 4;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    column-count: 3;
  }

  @media screen and (max-width: 800px) {
    display: flex;
    overflow: hidden;
    width: fit-content;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    max-width: calc(100vw);
    padding: 0 1rem;
    box-sizing: border-box;
    height: fit-content;
    flex-wrap: nowrap;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: hidden;
  }
`;
