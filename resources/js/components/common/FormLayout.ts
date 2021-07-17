import styled from "styled-components";

export const FormWrapper = styled.div`
    padding: 2rem 0 2rem 2rem;
    background-color: ${(props) => props.theme.primaryBackground};
    p {
        text-align: center;
        color: ${(props) => props.theme.primaryText};
    }
`;

export const FormTitle = styled.div`
    text-align: center;
    margin-bottom: 1.5rem;
    h1 {
        color: ${(props) => props.theme.colorOrange};
    }
    p {
        margin-top: 0.5rem;
        color: ${(props) => props.theme.errorText};
    }
`;

export const Form = styled.form`
    display: grid;
    grid-gap: 1.3rem;
    /* justify-items: center; */
`;
