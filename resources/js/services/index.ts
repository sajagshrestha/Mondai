import { loadFromStorage } from "../utils/localStorage";

export const BASE_URL = process.env.MIX_API_URL;

export const getAuthToken = () => {
    const user = loadFromStorage("user");
    return `Bearer ${user?.token}`;
};

export const getAuthHeader = () => ({
    Authorization: getAuthToken(),
});
