import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import List from "./List";
import {
    fetchBoardList,
    updateBoardList,
    fetchBoard,
} from "../../services/BoardService";
import {
    DragDropContext,
    Droppable,
    DroppableProvided,
} from "react-beautiful-dnd";
import BoardInfo from "./BoardInfo";
import AddList from "./AddList";

const BoardListWrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;
const Lists = styled.div`
    min-height: 70vh;
    display: flex;
    align-items: flex-start;
    white-space: nowrap;
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;

    /* width */
    ::-webkit-scrollbar {
        width: 7px;
        height: 10px;
        cursor: pointer;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border: 2px solid ${({ theme }) => theme.colorDark500};
        border-radius: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colorOrange};
        border-radius: 10px;
    }
`;

const BoardList = () => {
    const [lists, setLists] = useState<any>([]);
    const { id } = useParams<any>();
    const { isLoading, data } = useQuery(["board-list", id], () =>
        fetchBoardList(id)
    );

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(updateBoardList);

    useEffect(() => {
        setLists(data);
    }, [data]);

    const onDragEnd = async (result: any) => {
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

        let updatedLists = lists.slice();
        if (type === "list") {
            const removedList = updatedLists.splice(source.index, 1);
            updatedLists.splice(destination.index, 0, ...removedList);
            setLists(updatedLists);
        } else {
            // find the source list and its index
            const sourceListIndex = lists.findIndex(
                (list: any) => list.id == source.droppableId
            );

            const destinationListIndex = lists.findIndex(
                (list: any) => list.id == destination.droppableId
            );

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
        }

        const reorderArray = updatedLists.map((list: any) => {
            const { id, cards } = list;
            const cardIdArray = cards.map((card: any) => card?.id);
            return { [id]: cardIdArray };
        });

        try {
            await mutateAsync(reorderArray);
            queryClient.invalidateQueries("board-list");
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <h1>Loading</h1>;

    return (
        <BoardListWrapper>
            <BoardInfo />
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
                                          lists={lists}
                                          setLists={setLists}
                                      />
                                  ))
                                : ""}

                            {provided.placeholder}
                            <AddList
                                appendList={(newLists: any) =>
                                    setLists(newLists)
                                }
                                board_id={id}
                            />
                        </Lists>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardListWrapper>
    );
};

export default BoardList;
