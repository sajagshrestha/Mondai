import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

export const CardContainer = styled.div`
    background: #292929;
    display: grid;
    color: #f2f2f2;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: 5px;
    padding: 1rem;
    width: 100%;
    height: 100px;
    margin-bottom: 5px;
`;

export const CardLabel = styled.div`
    height: 2px;
    background: #47fb79;
    border-radius: 10px;
`;

export const CardTitle = styled.div``;
export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const StyledAvatar = styled(Avatar)`
    &&& {
        height: 25px;
        width: 25px;
        font-size: 12px;
    }
`;

export const DueDate = styled.div``;
