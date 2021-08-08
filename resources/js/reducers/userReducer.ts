import { Reducer } from "redux";
import { loadFromStorage } from "../utils/localStorage";

export interface IUSER {
    isLoggedIn: Boolean;
    userName: String;
    userId: String;
}

const user = loadFromStorage("user");

const initialState: IUSER = {
    isLoggedIn: user ? user.isLoggedIn : false,
    userName: user ? user.user.name : "",
    userId: user ? user.user.id : "",
};

export type UserAction =
    | { type: "LOGIN"; userName: String; userId: String }
    | { type: "LOGOUT" };

export const userReducer: Reducer<IUSER, UserAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isLoggedIn: true,
                userName: action.userName,
                userId: action.userId,
            };
        }
        case "LOGOUT": {
            return { ...state, isLoggedIn: false, userName: "" };
        }
        default:
            return state;
    }
};
