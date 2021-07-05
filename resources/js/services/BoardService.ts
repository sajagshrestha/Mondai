import axios from "axios";
import { BASE_URL, getAuthHeader } from "./index";

export const fetchAllBoards = async () => {
    return axios
        .get(`${BASE_URL}/boards`, {
            headers: getAuthHeader(),
        })
        .then((res) => res.data.data);
};
