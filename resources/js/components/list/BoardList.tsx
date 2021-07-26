import React, { useState, useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../reducers";
import { useQuery } from "react-query";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import List from "./List";
import { fetchBoardList } from "../../services/BoardService";

import Fab from "../common/Fab";
import Modal from "../common/Modal";
import EditBoardForm from "./EditBoardForm";

const BoardListWrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;
const Lists = styled.div`
    display: flex;
    align-items: flex-start;
`;

const ActionWrapper = styled.div`
    margin-left: auto;
`;

const EditButton = styled(IconButton)`
    &&& {
        color: green;
    }
`;
const BoardList = () => {
    const { isLoading, data } = useQuery("boards", fetchBoardList);
    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);

    const dispatch = useReduxDispatch();

    return (
        <BoardListWrapper>
            <ActionWrapper>
                <EditButton
                    aria-label="edit"
                    onClick={() => {
                        dispatch({ type: "OPEN_CREATE_BOARD_MODAL" });
                    }}
                >
                    <EditIcon />
                </EditButton>

                <Modal
                    isOpen={isCreateBoardOpen}
                    onClose={() => {
                        dispatch({ type: "CLOSE_CREATE_BOARD_MODAL" });
                    }}
                >
                    <EditBoardForm board={null} />
                </Modal>
                <IconButton aria-label="delete" color="secondary">
                    <DeleteIcon />
                </IconButton>
            </ActionWrapper>

            <Lists>
                {data?.map((list: any) => (
                    <List key={list.id} list={list} />
                ))}
            </Lists>
        </BoardListWrapper>
    );
};

export default BoardList;
