import styled from "styled-components";

export const NewsWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 2px;
  width: 100%;
  height: 10rem;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NewsImage = styled.img`
  object-fit: cover;
  width: 100%;
  max-width: 40rem;
  height: 100%;
  border-radius: 1rem;
  position: absolute;
`;

export const PreviousButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;
`;

export const NextButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem 0 0 1rem;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1;
  align-self: center;
  margin-top: auto;
`;

export const NewsTitle = styled.h2`
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: 500;
  z-index: 0;
  color: white;
  align-self: baseline;
  margin-top: auto;
`;
