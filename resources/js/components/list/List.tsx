import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";
import Card from "../card/Card";
import AddCard from "./AddCard";


const ListContainer = styled.div`
    background: #151514;
    color: #ffffff;
    padding: 1rem;
    width: 350px;
    margin-right: 1rem;

`;

const List: React.FC<{list: any}> = ({list}) => {
    const [cards, setCards] = useState<any>([]);

    const appendCard = (card: any): void => {
        setCards([...cards, card]);
    };

    useEffect(() => {
        axios
            .get(`${BASE_URL}/card/${list.id}`, {
                headers: getAuthHeader(),
            })
            .then((response: any) => {
                setCards(response.data.data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    return (
        <ListContainer>
            <h3>{list.name}</h3>
            {cards.map((c: any) => (
                <div key={c.id}>
                    <Card card={c} />
                </div>
            ))}
            <AddCard appendCard={appendCard} list_id={list.id}/>
        </ListContainer>
    );
};

export default List;
