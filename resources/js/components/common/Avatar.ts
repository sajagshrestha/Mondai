import styled from "styled-components";
import { Avatar as MuiAvatar } from "@material-ui/core";

const Avatar = styled(MuiAvatar)`
    &&.MuiAvatar-colorDefault {
        background-color: ${(props) => props.theme.colorOrange};
    }
`;

export default Avatar;
