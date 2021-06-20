export const saveToStorage = (key: string, value: {}) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key: string): {} | null => {
    // return JSON.parse(localStorage.getItem("key"));
    const dataFromStorage = localStorage.getItem(key);
    return JSON.parse(dataFromStorage ? dataFromStorage : "");
};

export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
};
