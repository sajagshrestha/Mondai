import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useReduxSelector } from "../../reducers";

const ProtectedRoute: React.FC<any> = ({ children, ...rest }) => {
    const { isLoggedIn } = useReduxSelector((state) => state.user);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isLoggedIn === true ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: location } }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
