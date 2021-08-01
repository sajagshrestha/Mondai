import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";
import Card from "../card/Card";
import AddCard from "./AddCard";
import {
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
} from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useReduxDispatch, useReduxSelector } from "../../reducers";
import Modal from "../common/Modal";
import TextField from "../common/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";

const ListContainer = styled.div`
    background: #151514;
    color: #ffffff;
    padding: 1rem;
    padding-top: 0;
    width: 350px;
    margin-right: 1rem;
`;
const ListTitle = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
`;
const CardList = styled.div`
    // padding: 1rem;
`;
const ListOptions = styled(MoreHorizIcon)`
    color: #fff;
`;

const List: React.FC<any> = ({ list, index, setLists }) => {
    const appendCard = (newLists: any): void => {
        setLists(newLists);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editList, setEditList] = useState<any>({
        name: list.name,
    });
    const [deleteList, setDeleteList] = useState(false);
    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);
    const dispatch = useReduxDispatch();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setDeleteList(true);
        setAnchorEl(null);
    };

    const handleTitleClick = () => {
        setEdit(!edit);
    };
    const onChangeHandler = (event: any) => {
        setEditList({
            ...editList,
            name: event.target.value,
        });
    };

    const editListHandler = (event: any) => {
        if (event.key === "Enter") {
            axios
                .post(
                    `${BASE_URL}/board-list/${list.id}`,
                    { _method: "PUT", name: editList.name },
                    {
                        headers: getAuthHeader(),
                    }
                )
                .then((res) => {
                    setLists(res.data.data);
                });

            setEdit(!edit);
        }
    };
    const deleteListHandler = (event: any) => {
        axios
            .post(
                `${BASE_URL}/board-list/${list.id}`,
                { _method: "DELETE" },
                {
                    headers: getAuthHeader(),
                }
            )
            .then((res) => {
                setLists(res.data.data);
                setDeleteList(false);
            });
    };
    return (
        <Draggable draggableId={`list-${list.id}`} index={index}>
            {(provided: DraggableProvided) => (
                <ListContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <ListTitle {...provided.dragHandleProps}>
                        {edit ? (
                            <ClickAwayListener
                                onClickAway={() => {
                                    setEdit(!edit);
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    value={editList.name}
                                    onChange={onChangeHandler}
                                    onKeyPress={editListHandler}
                                />
                            </ClickAwayListener>
                        ) : (
                            <h3 onClick={handleTitleClick}>{list.name}</h3>
                        )}
                        <div>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <ListOptions />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Delete
                                </MenuItem>
                            </Menu>
                            <ConfirmationDialog
                                isOpen={deleteList}
                                confirmButtonLabel="Delete"
                                isConfirming={false}
                                message="Are you sure you want to delete this list?"
                                onClose={() => setDeleteList(false)}
                                title="Delete confirmation"
                                onConfirm={deleteListHandler}
                            />
                        </div>
                    </ListTitle>
                    <Droppable droppableId={`${list.id}`} type="card">
                        {(provided: DroppableProvided) => (
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {list.cards.map((c: any, index: number) => (
                                    <div key={c.id}>
                                        <Card card={c} index={index} />
                                    </div>
                                ))}
                                {provided.placeholder}
                            </CardList>
                        )}
                    </Droppable>
                    <AddCard appendCard={appendCard} list_id={list.id} />
                </ListContainer>
            )}
        </Draggable>
    );
};

export default List;
