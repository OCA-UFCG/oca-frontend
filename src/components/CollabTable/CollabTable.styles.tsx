"use client";

import styled from "styled-components";

export const Table = styled.table`
  max-width: 1300px;

  border-radius: 4px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  border-spacing: 0.75rem;
  padding: 0.5rem 1rem;

  td:not(:last-child),
  th:not(:last-child) {
    width: calc(100% / 3); /* Set equal width for all columns except the last */
  }

  td:first-child,
  th:first-child {
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    left: 0;
    background: white;
  }
`;

export const TableHead = styled.thead``;

export const Row = styled.tr`
  th:last-child {
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  ${Row}:hover td {
    background-color: #f2f2f2;
  }
`;

export const HeadItem = styled.th`
  padding: 0.75rem 1rem;
  vertical-align: middle;
  text-align: start;
  font-weight: bold;
`;
export const BodyItem = styled.td`
  border-top: 1px solid #e8e8e8;
  vertical-align: middle;
  flex-grow: 1;
  padding: 0.75rem 1rem;
`;

export const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & svg {
    transition: 300ms;
    color: ${({ theme }) => theme.colors.black}90;
    cursor: pointer;
  }

  & svg:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;
