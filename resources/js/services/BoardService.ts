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

export const editBoard = async (id: any, formData: any) => {
    return axios.post(`${BASE_URL}/boards/${id}`, formData, {
        headers: getAuthHeader(),
    });
};

export const fetchBoardList = async (id: number) => {
    return axios
        .get(`${BASE_URL}/board-list/${id}`, {
            headers: getAuthHeader(),
        })
        .then((res) => res.data.data);
};

export const updateBoardList = async (payload: any) => {
    return axios.post(
        `${BASE_URL}/board-list/reorder`,
        { reorderArray: payload },
        {
            headers: getAuthHeader(),
        }
    );
};

export const fetchBoard = async (id: number) => {
    return axios
        .get(`${BASE_URL}/boards/${id}`, { headers: getAuthHeader() })
        .then((res) => res.data.data[0]);
};
