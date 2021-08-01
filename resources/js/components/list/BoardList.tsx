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


const BoardListWrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;
const Lists = styled.div`
    display: flex;
    align-items: flex-start;
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

    if (isLoading ) return <h1>Loading</h1>;

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
                        </Lists>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardListWrapper>
    );
};

export default BoardList;
