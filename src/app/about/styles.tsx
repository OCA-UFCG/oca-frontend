import styled from "styled-components";
import Image from "next/image";

export const ContentWrapper = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 1100px;
    padding-bottom: 1rem;
`


export const OcaImage = styled(Image)`
    width: fit-content;
    height: 15rem;
`;
