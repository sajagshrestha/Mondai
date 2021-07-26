import axios from "axios";
import { BASE_URL, getAuthHeader } from "./index";

export const fetchAllBoards = async () => {
    return axios
        .get(`${BASE_URL}/boards`, {
            headers: getAuthHeader(),
        })
        .then((res) => res.data.data);
};

export const createBoard = async (formData: FormData) => {
    return axios.post(`${BASE_URL}/boards`, formData, {
        headers: getAuthHeader(),
    });
};

export const editBoard = async (formData: FormData) => {
    return axios.post(`${BASE_URL}/boards/3`, formData, {
        headers: getAuthHeader(),
    });
};

export const fetchBoardList = async () => {
    return axios
    .get(`${BASE_URL}/board-list/3`, {
        headers: getAuthHeader(),
    })
    .then((res) => res.data.data);
};
