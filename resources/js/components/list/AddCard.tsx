import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "../common/TextField";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";

const AddCardContainer = styled.div`
    background: #151514;
    margin-top: 10px;
    width: 100%;
`;

const StyledAddButton = styled(Button)`
    &&& {
        color: #a2a0a0;
        &:hover {
            background-color: #2b2929;
        }
    }
`;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const AddCard: React.FC<{ appendCard: any; list_id: number }> = ({
    appendCard,
    list_id,
}) => {
    const [formDisplay, setFormDisplay] = useState(false);
    const [card, setCard] = useState<any>({
        title: "",
    });
    const toggleHandler = () => {
        setFormDisplay(!formDisplay);
    };
    const onChangeHandler = (event: any) => {
        setCard({
            ...card,
            title: event.target.value,
        });
    };
    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        axios
            .post(`/api/card/${list_id}`, card, {
                headers: getAuthHeader(),
            })
            .then((response) => {
                appendCard(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setCard({
            ...card,
            title: "",
        });
        toggleHandler();
    };
    return (
        <AddCardContainer>
            {formDisplay ? (
                <div className="mt-3">
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Enter card title"
                            variant="outlined"
                            fullWidth
                            value={card.title}
                            onChange={onChangeHandler}
                        />
                        <ButtonWrapper>
                            <StyledAddButton
                                variant="outlined"
                                color="default"
                                type="submit"
                            >
                                Add card
                            </StyledAddButton>
                            <StyledAddButton
                                color="default"
                                onClick={toggleHandler}
                            >
                                X
                            </StyledAddButton>
                        </ButtonWrapper>
                    </form>
                </div>
            ) : (
                <StyledAddButton fullWidth onClick={toggleHandler}>
                    + Add another card
                </StyledAddButton>
            )}
        </AddCardContainer>
    );
};

export default AddCard;
