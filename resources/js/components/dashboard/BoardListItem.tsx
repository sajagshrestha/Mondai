import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import Avatar from "../common/Avatar";

import * as nameUtlis from "../../utils/name";

const BoardListItemWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: ${(props) => props.theme.colorDark500};
    margin: 2rem 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: ${({ theme }) => theme.boxShadow};
    }
`;

const BoardName = styled.h1`
    font-size: 1.2rem;
`;

const BoardOwner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`;

interface IPROPS {
    boardName: string;
    boardOwner: string;
}

const BoardListItem: React.FC<IPROPS> = (props) => {
    const { boardName, boardOwner } = props;

    const history = useHistory();

    const redirectToBoard = () => history.push("/board/list");

    return (
        <BoardListItemWrapper onClick={redirectToBoard}>
            <BoardName>{boardName}</BoardName>
            <BoardOwner>
                <Avatar>{nameUtlis.getInitials(boardOwner)}</Avatar>
                {boardOwner}
            </BoardOwner>
        </BoardListItemWrapper>
    );
};

export default BoardListItem;
