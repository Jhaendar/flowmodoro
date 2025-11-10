import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../features/timer/timerSlice";
import todosReducer from "../features/todos/todosSlice";
import { saveTodosToLocalStorage, loadTodosFromLocalStorage } from "@/lib/localStorage";

// Load persisted todos from localStorage
const persistedTodos = loadTodosFromLocalStorage();
const preloadedState = persistedTodos
  ? {
      todos: { todos: persistedTodos },
    }
  : undefined;

// Middleware to save todos to localStorage on every change
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save todos to localStorage after any todos action
  if (action.type?.startsWith("todos/")) {
    const state = store.getState();
    saveTodosToLocalStorage(state.todos.todos);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: true,
});
