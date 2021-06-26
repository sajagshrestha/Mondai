//Combine all reducers
import { combineReducers } from "redux";
import { createSelectorHook, createDispatchHook } from "react-redux";
import { UserAction, userReducer } from "./userReducer";

//rootReducer
export const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

//custom selector and dispatch
export const useReduxSelector = createSelectorHook<RootState>();
export const useReduxDispatch = createDispatchHook<void, UserAction>();
