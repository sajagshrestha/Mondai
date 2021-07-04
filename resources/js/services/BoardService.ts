import axios from "axios";
import { BASE_URL, getAuthHeader } from "./index";

const authHeader = getAuthHeader();

export const fetchAllBoards = async () => {
    return axios
        .get(`${BASE_URL}/boards`, {
            headers: authHeader,
        })
        .then((res) => res.data.data);
};
