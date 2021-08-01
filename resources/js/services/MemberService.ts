import axios from "axios";
import { BASE_URL, getAuthHeader } from "./index";

export const addMember = async (
    boardId: string,
    signature: string | string[]
) =>
    axios.post(`${BASE_URL}/invite/${boardId}?signature=${signature}`, {
        headers: getAuthHeader(),
    });
