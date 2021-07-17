import { Button } from "@material-ui/core";
import styled from "styled-components";

export const UserMenuButton = styled(Button)`
    .MuiButton-label {
        font-size: 1rem;
        color: ${(props) => props.theme.colorOrange};
    }
    &&.MuiIcon-root {
        color: ${(props) => props.theme.colorOrange};
    }
    &&.MuiButton-outlined {
        border-radius: 0;
        border: 3px solid;
        display: flex;
        align-items: center;
        border-color: ${(props) => props.theme.colorOrange};
    }
`;
