import styled from "styled-components";
import { Fab as MuiFab } from "@material-ui/core";

const Fab = styled(MuiFab)`
    && {
        background-color: ${({ theme }) => theme.colorOrange};
        &:hover {
            background-color: ${({ theme }) => theme.colorOrange};
        }
    }
`;

export default Fab;
