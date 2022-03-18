export function retrieveFromStorage(key) {
    const item = localStorage.getItem(key);

    if (item === null) {
        return [];
    } else {
        return JSON.parse(item);
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

