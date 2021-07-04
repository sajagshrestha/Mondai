import { loadFromStorage } from "../utils/localStorage";

export const BASE_URL = process.env.APP_URL;

export const getAuthToken = () => {
    const { token } = loadFromStorage("user");
    return `Bearer ${token ? token : ""}`;
    // return BASE_URL;
};
