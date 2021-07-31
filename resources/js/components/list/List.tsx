import React, { useEffect, useState } from "react";
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

const ListContainer = styled.div`
    background: #151514;
    color: #ffffff;
    padding: 1rem;
    width: 350px;
    margin-right: 1rem;
`;

const CardList = styled.div`
    // padding: 1rem;
`;

const List: React.FC<any> = ({ list, index, setLists }) => {
    const appendCard = (newLists: any): void => {
        setLists(newLists);
    };

    return (
        <Draggable draggableId={`list-${list.id}`} index={index}>
            {(provided: DraggableProvided) => (
                <ListContainer
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <h3 {...provided.dragHandleProps}>{list.name}</h3>
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
