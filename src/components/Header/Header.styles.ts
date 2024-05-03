import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 0;

    @media screen and (max-width: 800px) {
        gap: 2rem;
        flex-flow: column;
    }

`

export const LogoImage = styled(Image)`
    height: 4rem;
    width: fit-content;

    @media screen and (max-width: 800px) {
        display: none
    }
`

export const Navbar = styled.nav`

`

export const NavList = styled.ul`
    display: flex;
    gap: 2rem;
    
    @media screen and (max-width: 800px) {
        gap: 1rem;
        flex-flow: column;
    }

`

export const NavItem = styled.li`
    transition: 0.3s;
    line-height: 1.5rem;
    font-weight: bold;

    &:hover {
        opacity: 0.6;
        border-bottom: thin solid ${({ theme }) => theme.colors.black};
    }
`