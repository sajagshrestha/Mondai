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
       try{
            await mutateAsync(formData);
            queryClient.invalidateQueries("boards");
            dispatch({
                type: "OPEN_SNACKBAR",
                severity: "success",
                message: "Successfully created board",
            });
            handleClose();
        }
        catch(err){
            if(err.response.data.status == 422){
                dispatch({
                    type: "OPEN_SNACKBAR",
                    severity: "error",
                    message: err.response.data.errors.name,
                });
            }
            else{
                dispatch({
                    type: "OPEN_SNACKBAR",
                    severity: "error",
                    message: "Something went wrong. PLease try again later",
                });
            }
        }
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
