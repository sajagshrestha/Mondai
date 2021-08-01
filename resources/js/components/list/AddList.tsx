import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "../common/TextField";
import axios from "axios";
import { BASE_URL, getAuthHeader } from "../../services/index";

const AddListContainer = styled.div`
    background: #151514;
    min-width: 250px;
    padding:1rem;
;
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

const AddList: React.FC<{ appendList: any; board_id: number }> = ({
    appendList,
    board_id,
}) => {
    const [formDisplay, setFormDisplay] = useState(false);
    const [list, setList] = useState<any>({
        name: "",
    });
    const toggleHandler = () => {
        setFormDisplay(!formDisplay);
    };
    const onChangeHandler = (event: any) => {
        setList({
            ...list,
            name: event.target.value,
        });
    };
    const onSubmitHandler = (event: any) => {
        event.preventDefault();
        axios
            .post(`/api/board-list/${board_id}`, list, {
                headers: getAuthHeader(),
            })
            .then((response) => {
                appendList(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setList({
            ...list,
            name: "",
        });
        toggleHandler();
    };
    return (
        <AddListContainer>
            {formDisplay ? (
                <div className="mt-3">
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Enter list name"
                            variant="outlined"
                            fullWidth
                            value={list.name}
                            onChange={onChangeHandler}
                        />
                        <ButtonWrapper>
                            <StyledAddButton
                                variant="outlined"
                                color="default"
                                type="submit"
                            >
                                Add list
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
                    + Add new list
                </StyledAddButton>
            )}
        </AddListContainer>
    );
};

export default AddList;
