import styled from "styled-components";

export const NavItem = styled.li`
  position: relative;
  transition: 0.3s;
  line-height: 1.5rem;
  list-style: none;
  border-left: thin solid transparent;
  margin: 0;

  a {
    display: block;
    text-decoration: none;
    width: 100%;
    font-weight: normal;
    font-style: none;
  }

  svg {
    margin-top: 4px;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;

    &:hover {
      padding-left: 0.5rem;
      border-left: thin solid ${({ theme }) => theme.colors.black};
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.black};

  a {
    color: ${({ theme }) => theme.colors.black};
    display: block;
    text-decoration: none;
    width: max-content;
    transition: 0.3s;
    font-style: none;
  }

  &:hover a {
    opacity: 0.6;
  }
`;

export const Wrapper = styled.div`
  padding-top: 1rem;

  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;
`;

export const ChildrenWrapper = styled.ul`
  margin: 0;
  position: absolute;
  border-radius: 4px;
  width: fit-content;
  padding: 0.75rem 1rem;
  flex-flow: column;
  gap: 0.75rem;
  display: none;
  box-shadow: 0px 0px 4px #00000015;

  &::before {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(40px);
    position: absolute;
    background-color: #ffffff;
    top: 0;
    left: 0;
    content: "";
  }

  ${NavItem}:hover & {
    display: flex;
  }
`;
