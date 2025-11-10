/**
 * Local storage utility functions
 */

const STORAGE_KEYS = {
  TODOS: "flowmodoro_todos",
};

/**
 * Save todos to localStorage
 * @param {Object} todos - The todos object to save
 */
export const saveTodosToLocalStorage = (todos) => {
  try {
    const serialized = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEYS.TODOS, serialized);
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
};

/**
 * Load todos from localStorage
 * @returns {Object|null} The todos object or null if not found
 */
export const loadTodosFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error("Error loading todos from localStorage:", error);
    return null;
  }
};

/**
 * Clear todos from localStorage
 */
export const clearTodosFromLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TODOS);
  } catch (error) {
    console.error("Error clearing todos from localStorage:", error);
  }
};
