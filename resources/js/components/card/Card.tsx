import React, { useState } from "react";
import EventIcon from "@material-ui/icons/Event";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import {
    CardContainer,
    CardLabel,
    CardTitle,
    CardFooter,
    DueDate,
    StyledAvatar,
    CardOptions,
    CardHeader,
} from "./CardStyle";
import TextField from "../common/TextField";
import { Tooltip, Menu, MenuItem } from "@material-ui/core";
import * as nameUtlis from "../../utils/name";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ConfirmationDialog from "../common/ConfirmationDialog/ConfirmationDialog";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";

const MenuIcon = styled(MoreHorizIcon)`
    &&& {
        margin: 0;
        padding: 0;
        margin-right: -40px;
    }
`;
const Card: React.FC<{ card: any; index: number; updateList: any }> = ({
    card,
    index,
    updateList,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editCard, setEditCard] = useState<any>({
        title: card.title,
    });
    const [deleteCard, setDeleteCard] = useState(false);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTitleClick = () => {
        setEdit(!edit);
    };
    const onChangeHandler = (event: any) => {
        setEditCard({
            ...editCard,
            title: event.target.value,
        });
    };

    const editCardHandler = (event: any) => {
        if (event.key === "Enter") {
            axios
                .post(
                    `${BASE_URL}/card/${card.id}`,
                    { _method: "PUT", title: editCard.title },
                    {
                        headers: getAuthHeader(),
                    }
                )
                .then((res) => {
                    updateList(res.data.data);
                });

            setEdit(!edit);
        }
    };
    const deleteCardHandler = (event: any) => {
        axios
            .post(
                `${BASE_URL}/card/${card.id}`,
                { _method: "DELETE" },
                {
                    headers: getAuthHeader(),
                }
            )
            .then((res) => {
                updateList(res.data.data);
                setDeleteCard(false);
            });
    };
    return (
        <Draggable draggableId={`${card.id}`} index={index}>
            {(provided: DraggableProvided) => (
                <CardContainer
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardHeader>
                        <CardLabel></CardLabel>
                        <CardOptions
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </CardOptions>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    setDeleteCard(true);
                                }}
                            >
                                Delete
                            </MenuItem>
                        </Menu>
                        <ConfirmationDialog
                            isOpen={deleteCard}
                            confirmButtonLabel="Delete"
                            isConfirming={false}
                            message="Are you sure you want to delete this card?"
                            onClose={() => setDeleteCard(false)}
                            title="Delete confirmation"
                            onConfirm={deleteCardHandler}
                        />
                    </CardHeader>

                    <CardTitle>
                    {edit ? (
                            <ClickAwayListener
                                onClickAway={() => {
                                    setEdit(!edit);
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    rows={3}
                                    multiline
                                    size="small"
                                    value={editCard.title}
                                    onChange={onChangeHandler}
                                    onKeyPress={editCardHandler}
                                    fullWidth
                                />
                            </ClickAwayListener>
                        ) : (
                            <span onClick={handleTitleClick}>{card.title}</span>
                        )}
                    </CardTitle>
                    <CardFooter>
                        {card.due_date ? (
                            <DueDate>
                                <EventIcon /> {card.due_date}
                            </DueDate>
                        ) : (
                            ""
                        )}
                        {card.creator ? (
                            <Tooltip title={`created by ${card.creator.name}`}>
                                {card.creator.avatar ? (
                                    <StyledAvatar
                                        alt={card.creator.name}
                                        src={card.creator.avatar}
                                        className="small"
                                    />
                                ) : (
                                    <StyledAvatar>
                                        {nameUtlis.getInitials(
                                            card.creator.name
                                        )}
                                    </StyledAvatar>
                                )}
                            </Tooltip>
                        ) : (
                            ""
                        )}
                    </CardFooter>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default Card;
