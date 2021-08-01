//Combine all reducers
import { combineReducers } from "redux";
import { createSelectorHook, createDispatchHook } from "react-redux";
import { UserAction, userReducer } from "./userReducer";
import { ModalActions, modalReducer } from "./ModalReducer";
import { SnackbarAction, SnackbarReducer } from "./SnackbarReducer";

//rootReducer
export const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
    snackbar: SnackbarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

//custom selector and dispatch
export const useReduxSelector = createSelectorHook<RootState>();
export const useReduxDispatch = createDispatchHook<
    void,
    UserAction | ModalActions | SnackbarAction
>();
