import React, { useState } from "react";
import styled from "styled-components";
import MuiIconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import Drawer from "@material-ui/core/Drawer";
import { useReduxDispatch, useReduxSelector } from "../../reducers";
import Fab from "../common/Fab";
import Modal from "../common/Modal";
import EditBoardForm from "./EditBoardForm";
import { useParams } from "react-router-dom";
import { BASE_URL, getAuthHeader } from "../../services/index";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchBoard, fetchInviteLink } from "../../services/BoardService";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";
import { useHistory } from "react-router";

const ActionWrapper = styled.div`
    margin-left: auto;
`;

const DetailWrapper = styled.div`
    width: 25vw;
    color: white;
    background-color: #111111;
    padding: 1rem;
    min-height: 100vh;
`;

const EditButton = styled(MuiIconButton)`
    &&& {
        color: ${({ theme }) => theme.colorOrange};
        height: 5px;
        width: 5px;
    }
`;

const IconButton = styled(MuiIconButton)`
    &&.MuiIconButton-root {
        color: ${({ theme }) => theme.colorOrange};
    }
`;

const BoardInfo = () => {
    const [drawerToggle, setDrawerToggle] = useState(false);
    const [deleteBoard, setDeleteBoard] = useState(false);
    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);
    const dispatch = useReduxDispatch();
    const { id } = useParams<any>();
    const history = useHistory();

    const boardData = useQuery<any>(["board", id], () => fetchBoard(id), {
        initialData: {
            name: "",
            description: "",
            created_at: "",
            owner: { name: "" },
            members: [{}],
        },
    });

    const handleInviteClick = async (event: any) => {
        try {
            const inviteLink = await fetchInviteLink(id);
            const filteredLink = inviteLink.replace("/api", "");
            navigator.clipboard.writeText(filteredLink);
        } catch (err) {
            console.log(err);
        }
    };
    const deleteBoardHandler = () => {
        axios
            .post(
                `${BASE_URL}/boards/${id}`,
                { _method: "DELETE" },
                {
                    headers: getAuthHeader(),
                }
            )
            .then((res) => {
                history.push("/dashboard");
            });
    };
    return (
        <ActionWrapper>
            <IconButton
                onClick={() => {
                    setDrawerToggle(!drawerToggle);
                }}
            >
                <InfoIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={drawerToggle}
                onClose={() => {
                    setDrawerToggle(!drawerToggle);
                }}
            >
                <DetailWrapper>
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
                        <EditBoardForm board={boardData.data} />
                    </Modal>
                    <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => setDeleteBoard(true)}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmationDialog
                        isOpen={deleteBoard}
                        confirmButtonLabel="Delete"
                        isConfirming={false}
                        message="Are you sure you want to delete this board"
                        onClose={() => setDeleteBoard(false)}
                        title="Delete confirmation"
                        onConfirm={deleteBoardHandler}
                    />
                    <div>Title :</div>
                    <div>{boardData.data.name}</div>
                    <div>Description :</div>
                    <div>{boardData.data.description}</div>
                    <div>Created :</div>
                    <div>{boardData.data.created_at}</div>
                    <div>Created by:</div>
                    <div>{boardData.data.owner.name}</div>
                    <div>
                        Members
                        <Link href="#" onClick={handleInviteClick}>
                            invite
                        </Link>
                    </div>
                    <div>
                        {boardData.data.members.map(
                            (member: any) => member.name
                        )}
                    </div>
                </DetailWrapper>
            </Drawer>
        </ActionWrapper>
    );
};

export default BoardInfo;
