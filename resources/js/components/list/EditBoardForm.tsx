import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useReduxDispatch } from "../../reducers";
import { editBoard } from "../../services/BoardService";
import BoardForm from "../common/BoardForm";

const EditBoardForm: React.FC<{board : any}> = ({board}) => {
    const queryClient = useQueryClient();
    const { mutateAsync, isLoading } = useMutation(editBoard);

    const dispatch = useReduxDispatch();

    const initialValues = {
        name: "",
        description:  "",
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
            buttonLabel={"Edit"}
            onClose={handleClose}
            onSubmitForm={handleSubmit}
            edit= {true}
        ></BoardForm>
    );
};

export default EditBoardForm;
