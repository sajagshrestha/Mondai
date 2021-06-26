export const saveToStorage = (key: string, value: {}) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key: string): any | null => {
    // return JSON.parse(localStorage.getItem("key"));
    const dataFromStorage = localStorage.getItem(key);
    if (!dataFromStorage) return null;
    return JSON.parse(dataFromStorage);
};

export const removeFromStorage = (key: string) => {
    localStorage.removeItem(key);
};
