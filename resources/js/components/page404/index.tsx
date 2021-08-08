import React from "react";
import styled from "styled-components";

const Container = styled.div`
    min-height: 75vh;
    color: ${(props) => props.theme.primaryText};
    font-size: 5rem;
    display: grid;
    place-items: center;
`;

const Page404: React.FC = () => {
    return <Container> 404 page not found</Container>;
};

export default Page404;
