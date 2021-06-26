import { Reducer } from "redux";
import { loadFromStorage } from "../utils/localStorage";

export interface IUSER {
    isLoggedIn: Boolean;
    userName: String;
}

const user = loadFromStorage("user");

const initialState: IUSER = {
    isLoggedIn: user ? user.isLoggedIn : false,
    userName: user ? user.user.name : "",
};

export type UserAction =
    | { type: "LOGIN"; payload: String }
    | { type: "LOGOUT" };

export const userReducer: Reducer<IUSER, UserAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "LOGIN": {
            return { ...state, isLoggedIn: true, userName: action.payload };
        }
        case "LOGOUT": {
            return { ...state, isLoggedIn: false, userName: "" };
        }
        default:
            return state;
    }
};
