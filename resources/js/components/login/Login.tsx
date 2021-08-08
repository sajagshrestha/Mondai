import React, { useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { saveToStorage } from "../../utils/localStorage";
import { useReduxSelector, useReduxDispatch } from "../../reducers";
import { userReducer } from "../../reducers/userReducer";

const Login: React.FC = () => {
    const dispatch = useReduxDispatch();
    const { isLoggedIn } = useReduxSelector((state) => state.user);

    const history = useHistory();
    const { search } = useLocation();
    const { code } = queryString.parse(search);

    useEffect(() => {
        if (code) {
            axios
                .get(`/api/login/google/callback?code=${code}`)
                .then((res) => {
                    if (res.status === 201) {
                        const data = res.data.data;
                        saveToStorage("user", {
                            isLoggedIn: true,
                            token: data.access_token,
                            user: data.user,
                        });
                        dispatch({
                            type: "LOGIN",
                            userName: data.user.name,
                            userId: data.user.id,
                        });
                        history.push("/dashboard");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (!code)
            window.location.replace(
                `${window.location.origin}/api/login/google`
            ); //refactor needed
    }, []);

    return (
        <>
            {isLoggedIn} ? <Redirect to="/dashboard" /> : null
        </>
    );
};

export default Login;
