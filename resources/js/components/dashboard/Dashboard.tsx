import React, { useState } from "react";
import { useQuery } from "react-query";

import styled from "styled-components";

import AddIcon from "@material-ui/icons/Add";

import { fetchAllBoards } from "../../services/BoardService";

import Fab from "../common/Fab";
import Modal from "../common/Modal";
import BoardListItem from "./BoardListItem";
import { useReduxDispatch, useReduxSelector } from "../../reducers";
import CreateBoardForm from "./CreateBoardForm";

const DashboardWrapper = styled.div``;

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CreateProjectSection = styled.div``;

const ProjectsSection = styled.div``;

const AddFabWrapper = styled.div`
    position: fixed;
    right: 3rem;
    bottom: 3rem;
`;

const Dashboard = () => {
    const { isLoading, data } = useQuery("boards", fetchAllBoards);

    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);

    const dispatch = useReduxDispatch();

    if (isLoading) return <h1>Loading</h1>;

    return (
        <DashboardWrapper>
            <CreateProjectSection></CreateProjectSection>
            <ProjectsSection>
                <TitleSection>
                    <h1>Project Boards</h1>
                    <h2>Owner</h2>
                </TitleSection>
                {data?.map((board: any) => (
                    <BoardListItem
                        key={board.id}
                        boardOwner={board.owner.name}
                        boardName={board.name}
                    />
                ))}
            </ProjectsSection>
            <AddFabWrapper>
                <Fab
                    color="primary"
                    onClick={() => {
                        dispatch({ type: "OPEN_CREATE_BOARD_MODAL" });
                    }}
                >
                    <AddIcon />
                </Fab>
            </AddFabWrapper>
            <Modal
                isOpen={isCreateBoardOpen}
                onClose={() => {
                    dispatch({ type: "CLOSE_CREATE_BOARD_MODAL" });
                }}
            >
                <CreateBoardForm />
            </Modal>
        </DashboardWrapper>
    );
};
export default Dashboard;
