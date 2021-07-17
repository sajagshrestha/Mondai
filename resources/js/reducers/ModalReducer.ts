import { Reducer } from "redux";

export interface IMODAL {
    isCreateBoardOpen: boolean;
}

const initialState: IMODAL = {
    isCreateBoardOpen: false,
};

export type ModalActions =
    | { type: "OPEN_CREATE_BOARD_MODAL" }
    | { type: "CLOSE_CREATE_BOARD_MODAL" };

export const modalReducer: Reducer<IMODAL, ModalActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "OPEN_CREATE_BOARD_MODAL": {
            return { ...state, isCreateBoardOpen: true };
        }
        case "CLOSE_CREATE_BOARD_MODAL": {
            return { ...state, isCreateBoardOpen: false };
        }
        default:
            return state;
    }
};
