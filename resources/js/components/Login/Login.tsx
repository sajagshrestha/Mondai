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
            console.log(code);
            axios
                .get(`/api/?code=${code}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                        history.push("/dashboard");
                        return res;
                    }
                    throw new Error("Error");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return <a href="/api/login/google">Login with google</a>;
};

export default Login;
