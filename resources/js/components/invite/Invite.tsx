import React, { useEffect } from "react";

import queryString from "query-string";
import { useParams, useLocation, useHistory } from "react-router";
import axios from "axios";
import { useReduxDispatch } from "../../reducers";
import { addMember } from "../../services/MemberService";

const Invite = () => {
    const history = useHistory();
    const { boardId } = useParams<any>();
    const { search } = useLocation();
    const { signature } = queryString.parse(search);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        if (boardId && signature) {
            addMember(boardId, signature)
                .then(() => {
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        severity: "success",
                        message: "Successfully joined board",
                    });
                    history.push("/dashboard");
                })
                .catch((err) => {
                    if(err.response.data.status == 422){
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            severity: "error",
                            message: "You are already member of the board",
                        });
                    }
                    else{
                        dispatch({
                            type: "OPEN_SNACKBAR",
                            severity: "error",
                            message: "Something went wrong. PLease try again later",
                        });
                    }
                });
        }
        history.push("/");
    }, []);

    return <div>Please Wait</div>;
};

export default Invite;
