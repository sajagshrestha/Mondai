import { Reducer } from "redux";

export interface SNACKBAR {
    isOpen: boolean;
    severity: "error" | "success" | undefined;
    message: string;
}

const initialState: SNACKBAR = {
    isOpen: false,
    severity: undefined,
    message: "",
};

export type SnackbarAction =
    | { type: "OPEN_SNACKBAR"; severity: SNACKBAR["severity"]; message: string }
    | { type: "CLOSE_SNACKBAR" };

export const SnackbarReducer: Reducer<SNACKBAR, SnackbarAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "OPEN_SNACKBAR": {
            return {
                ...state,
                isOpen: true,
                severity: action.severity,
                message: action.message,
            };
        }
        case "CLOSE_SNACKBAR": {
            return initialState;
        }
        default:
            return state;
    }
};
