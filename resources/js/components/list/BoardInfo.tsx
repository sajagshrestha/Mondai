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

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .members {
        display: flex;
        justify-content: space-between;
        a {
            color: ${(props) => props.theme.colorOrange};
        }
    }
    span {
        color: ${(props) => props.theme.colorOrange};
        font-weight: bold;
        font-size: 1.1rem;
    }
`;
const BoardInfo = () => {
    const [drawerToggle, setDrawerToggle] = useState(false);
    const [deleteBoard, setDeleteBoard] = useState(false);
    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);
    const dispatch = useReduxDispatch();
    const { id } = useParams<any>();
    const history = useHistory();
    const { userId } = useReduxSelector((state) => state.user);

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
            dispatch({
                type: "OPEN_SNACKBAR",
                severity: "success",
                message: "Invite Link Copied to Clipboard",
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "OPEN_SNACKBAR",
                severity: "error",
                message: "Invite Link Copy failed",
            });
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
                dispatch({
                    type: "OPEN_SNACKBAR",
                    severity: "success",
                    message: "Successfully deleted board",
                });
                history.push("/dashboard");
            })
            .catch((err) => {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    severity: "error",
                    message: "Something went wrong. please try again later",
                });
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
                    {userId === boardData.data.owner.id ? (
                        <>
                            <EditButton
                                aria-label="edit"
                                onClick={() => {
                                    dispatch({
                                        type: "OPEN_CREATE_BOARD_MODAL",
                                    });
                                }}
                            >
                                <EditIcon />
                            </EditButton>

                            <Modal
                                isOpen={isCreateBoardOpen}
                                onClose={() => {
                                    dispatch({
                                        type: "CLOSE_CREATE_BOARD_MODAL",
                                    });
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
                        </>
                    ) : (
                        ""
                    )}

                    <InfoContainer>
                        <div>
                            <span>Title : </span> {boardData.data.name}
                        </div>
                        <div>
                            <span>Description :</span>
                        </div>
                        <div>{boardData.data.description}</div>
                        <div>
                            <span>Created : </span> {boardData.data.created_at}
                        </div>
                        <div>
                            <span>Created by: </span>{" "}
                            {boardData.data.owner.name}
                        </div>
                        <div className="members">
                            <span>Members </span>
                            {userId === boardData.data.owner.id ? (
                                <a href="#" onClick={handleInviteClick}>
                                    invite
                                </a>
                            ) : (
                                ""
                            )}
                        </div>
                        <div>
                            {boardData.data.members.map((member: any) => (
                                <div key={member.id}>
                                    {member.name}{" "}
                                    {member.id === boardData.data.owner.id
                                        ? "(owner)"
                                        : ""}
                                </div>
                            ))}
                        </div>
                    </InfoContainer>
                </DetailWrapper>
            </Drawer>
        </ActionWrapper>
    );
};

export default BoardInfo;
