import React, { useState, useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../reducers";
import { useQuery } from "react-query";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import List from "./List";
import { fetchBoardList } from "../../services/BoardService";
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
} from "react-beautiful-dnd";

import Fab from "../common/Fab";
import Modal from "../common/Modal";
import EditBoardForm from "./EditBoardForm";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";

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
    const [lists, setLists] = useState<any>();
    const { isLoading, data } = useQuery("boards", fetchBoardList);
    const { isCreateBoardOpen } = useReduxSelector((state) => state.modal);
    useEffect(() => {
        setLists(data);
    }, [data]);
    const dispatch = useReduxDispatch();
    const onDragEnd = (result: any) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (type === "list") {
            let updatedLists = lists.slice();
            const removedList = updatedLists.splice(source.index, 1);
            updatedLists.splice(destination.index, 0, ...removedList);
            setLists(updatedLists);
            return;
        }

        // find the source list and its index
        const sourceListIndex = lists.findIndex(
            (list: any) => list.id == source.droppableId
        );

        const destinationListIndex = lists.findIndex(
            (list: any) => list.id == destination.droppableId
        );

        let updatedLists = [...lists];

        const removedCard = updatedLists[sourceListIndex].cards.splice(
            source.index,
            1
        );
        updatedLists[destinationListIndex].cards.splice(
            destination.index,
            0,
            ...removedCard
        );
        setLists(updatedLists);

        const reorderArray = updatedLists.map((list:any) => {
            const { id, cards } = list;
            const cardIdArray = cards.map((card:any) => card?.id);
            return { [id]: cardIdArray };
        });

        axios
        .post(`${BASE_URL}/board-list/reorder`,{'reorderArray' : reorderArray}, {
            headers: getAuthHeader(),
        });
    }
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

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-list"
                    direction="horizontal"
                    type="list"
                >
                    {(provided: DroppableProvided) => (
                        <Lists
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {lists
                                ? lists.map((list: any, index: number) => (
                                      <List
                                          key={list.id}
                                          list={list}
                                          index={index}
                                      />
                                  ))
                                : ""}

                            {provided.placeholder}
                        </Lists>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardListWrapper>
    );
};

export default BoardList;
