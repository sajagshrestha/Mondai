import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useReduxDispatch } from "../../reducers";
import { createBoard } from "../../services/BoardService";
import BoardForm from "../common/BoardForm";

const CreateBoardForm: React.FC = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(createBoard);

    const dispatch = useReduxDispatch();

    const initialValues = {
        name: "",
        description: "",
    };

    const handleClose = () => dispatch({ type: "CLOSE_CREATE_BOARD_MODAL" });

    const handleSubmit = async (formData: FormData) => {
        await mutateAsync(formData);
        queryClient.invalidateQueries("boards");
        handleClose();
    };

    return (
        <BoardForm
            initialValues={initialValues}
            formTitle={"Create New Board"}
            buttonLabel={"Create"}
            onClose={handleClose}
            onSubmitForm={handleSubmit}
        ></BoardForm>
    );
};

export default CreateBoardForm;
