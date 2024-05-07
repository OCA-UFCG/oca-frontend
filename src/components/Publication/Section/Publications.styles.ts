import styled from "styled-components";

export const PublicationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  padding: 1rem;
  gap: 1rem;

  
  
  @media screen and (max-width: 800px) {
    position: relative;
    justify-content: flex-start;
    align-items: center;
    max-width: calc(100vw - 1rem);
    padding: 0 1rem;
    box-sizing: border-box;
    height: fit-content;
    flex-wrap: nowrap;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: hidden;
  }
`;
