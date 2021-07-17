import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./style.css";

const ListContainer = styled.div`
    background: #151514;
    color: #ffffff;
    padding: 1rem;
    width: 350px;
`;
const AddCardContainer = styled.div`
    background: #151514;
    color: #ffffff;
    margin-top: 10px;
    width:100%;
`;
import Card from "../card/Card";
const List = () => {
    const [cards, setCards] = useState<any>([]);
    const [formDisplay, setFormDisplay] = useState(false);
    const [card, setCard] = useState<any>({
        title: "",
        user_id: 1,
    });

    useEffect(() => {
        axios
            .get(`${BASE_URL}/card/1`, {
                headers: getAuthHeader(),
            })
            .then((response) => {
                setCards(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onChangeHandler = (event: any) => {
        setCard({
            ...card,
            title: event.target.value
        });
    };
    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        axios
            .post("/api/card/1", card, {
                headers: getAuthHeader(),
            })
            .then(response => {
                console.log(response.data.data[0]);
                setCards([...cards, response.data.data[0]]);
            })
            .catch(err => {
                console.log(err);
            });
        setCard({
            ...card,
            title: ""
        });
        toggleHandler()
    };

    const toggleHandler = () => {
        setFormDisplay(!formDisplay);
    };


    return (
        <ListContainer>
            <h3>Todo</h3>
            {cards.map((c: any) => (
                <div key={c.id}>
                    <Card card={c} />
                </div>
            ))}
            <AddCardContainer>
                {formDisplay ? (
                    <div className="mt-3">
                        <form onSubmit={onSubmitHandler}>

                            <TextField
                                multiline
                                rows={4}
                                placeholder="Enter card title"
                                variant="outlined"
                                className="add"
                                fullWidth
                                value={card.title}
                                onChange={onChangeHandler}
                            />
                            <div>
                                <Button variant="outlined" color="default" type="submit">
                                    Add card
                                </Button>
                                <Button color="default" onClick={toggleHandler}>
                                    X
                                </Button>
                            </div>
                        </form>

                    </div>
                ) : (
                    <Button
                        color="default"
                        className="w-100 add"
                        onClick={toggleHandler}
                    >
                        + Add another card
                    </Button>
                )}
            </AddCardContainer>
        </ListContainer>
    );
};

export default List;
