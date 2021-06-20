import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { saveToStorage } from "../../utils/localStorage";

const Login: React.FC = () => {
    const history = useHistory();
    const { search, pathname } = useLocation();
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

    return <> </>;
};

export default Login;
