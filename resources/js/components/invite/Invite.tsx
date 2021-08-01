import React, { useEffect } from "react";

import queryString from "query-string";
import { useParams, useLocation, useHistory } from "react-router";
import axios from "axios";
import { addMember } from "../../services/MemberService";

const Invite = () => {
    const history = useHistory();
    const { boardId } = useParams<any>();
    const { search } = useLocation();
    const { signature } = queryString.parse(search);

    useEffect(() => {
        if (boardId && signature) {
            addMember(boardId, signature).then(() =>
                history.push("/dashboard")
            );
        }
        history.push("/");
    }, []);

    return <div>Please Wait</div>;
};

export default Invite;
