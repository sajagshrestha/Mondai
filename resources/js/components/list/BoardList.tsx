import React, { useState, useEffect } from "react";
import List from "./List";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchBoardList } from "../../services/BoardService";

const BoardListWrapper = styled.div`
    padding: 1rem;
    display: flex;
    align-items: flex-start;
`;
const BoardList = () => {
    const { isLoading, data } = useQuery("boards", fetchBoardList);

    return (
        <BoardListWrapper>
            {data?.map((list: any) => (
                <List key={list.id} list={list} />
            ))}
        </BoardListWrapper>
    );
};

export default BoardList;
