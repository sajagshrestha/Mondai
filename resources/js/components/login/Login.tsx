import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
const Login: React.FC = () => {
    const history = useHistory();
    const { search } = useLocation();
    const { code } = queryString.parse(search);

    useEffect(() => {
        if (code) {
            axios
                .get(`/api/login/google/callback?code=${code}`)
                .then((res) => {
                    if (res.status === 201) {
                        console.log(res.data.data);
                        history.push("/dashboard");
                        return res;
                    }
                    throw new Error("Error");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            history.push("/api/login/google");
        }
    }, []);

    return <div>Log in</div>;
};

export default Login;
