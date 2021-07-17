import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";

const Button = styled.button`
    background-color: ${(props) => props.theme.colorOrange};
    padding: 0.7em 2em;
    cursor: pointer;
    box-shadow: 4px 10px 20px rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    font-family: ${(props) => props.theme.primaryFont};
    color: ${(props) => props.theme.primaryText};
    font-weight: bold;
`;

export default Button;
