import React from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useReduxDispatch } from "../../reducers";
import { editBoard } from "../../services/BoardService";
import BoardForm from "../common/BoardForm";

const EditBoardForm: React.FC<{ board: any }> = ({ board }) => {
    const queryClient = useQueryClient();

    const dispatch = useReduxDispatch();

    const handleClose = () => dispatch({ type: "CLOSE_CREATE_BOARD_MODAL" });

    const { mutateAsync } = useMutation(
        (formdata: FormData) => editBoard(board.id, formdata),
        {
            onSuccess: async () => {
                queryClient.invalidateQueries("boards");
                queryClient.invalidateQueries("board");
                handleClose();
            },
        }
    );

    const handleSubmit = async (formData: FormData) => {
        await mutateAsync(formData);
    };

    const initialValue = {
        name: board.name,
        description: board.description,
    };
    return (
        <BoardForm
            initialValues={initialValue}
            formTitle={"Create New Board"}
            buttonLabel={"Edit"}
            onClose={handleClose}
            onSubmitForm={handleSubmit}
            edit={true}
        ></BoardForm>
    );
};

export default EditBoardForm;
