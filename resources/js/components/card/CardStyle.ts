import styled from "styled-components";
import Avatar from "../common/Avatar";
import { Button } from "@material-ui/core";
export const CardContainer = styled.div`
    background: #292929;
    display: grid;
    color: #f2f2f2;
    grid-row-gap: 5px;
    padding: 1rem;
    width: 100%;
    min-height: 100px;
    margin-bottom: 10px;
`;

export const CardLabel = styled.div`
    height: 3px;
    width: 75%;
    background: #47fb79;
    border-radius: 10px;
    margin-right: auto;
`;

export const CardTitle = styled.div`
    padding: 1px;
    min-height: 20px;
    white-space: initial;
    margin-top: 10px;
`;

export const CardHeader = styled.div`
    display: flex;
    /* justify-content: space-between; */
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 5px;
`;

export const StyledAvatar = styled(Avatar)`
    &&& {
        height: 25px;
        width: 25px;
        font-size: 12px;
    }
`;

export const DueDate = styled.div``;

export const CardOptions = styled(Button)`
    &&& {
        color: #fff;
        margin: 0;
        padding: 0;
        height: 2px;
        width: 10px;
    }
`;
