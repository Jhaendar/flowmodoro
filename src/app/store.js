import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../features/timer/timerSlice";
import todosReducer from "../features/todos/todosSlice";
export const store = configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
  },
  devTools: true,
});
