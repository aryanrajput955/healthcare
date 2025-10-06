// stores/store.js
export default class Store {
  static setItem(key, value) {
    if (typeof window !== 'undefined') {
      if (value === undefined || value === null) {
        console.warn(`Attempted to store invalid value for key "${key}". Skipping setItem.`);
        return;
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting item in localStorage for key "${key}":`, error);
      }
    }
  }

  static getItem(key) {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(key);
      if (value === null) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(`Error parsing JSON for key "${key}":`, error);
        window.localStorage.removeItem(key);
        return null;
      }
    }
    return null;
  }

  static removeItem(key) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item from localStorage for key "${key}":`, error);
      }
    }
  }
}