export default class Store {
    // write to local storage
    static setItem(key, value) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    static getItem(key) {
        if (typeof window !== 'undefined') {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        }
    }

    static removeItem(key) {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
        }
    }
}