import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: {},
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { content, isEditing, isFinished } = action.payload;
      const id = uuidv4();
      state.todos[id] = {
        id,
        content,
        isEditing,
        isFinished,
      };
    },
    updateTodo: (state, action) => {
      const { id, content } = action.payload;

      state.todos[id].content = content;
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      delete state.todos[id];
    },
    setTodoIsFinished: (state, action) => {
      const { id, isFinished } = action.payload;
      state.todos[id].isFinished = isFinished;
    },
    setTodoIsEditing: (state, action) => {
      const { id, isEditing } = action.payload;
      state.todos[id].isEditing = isEditing;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  setTodoIsFinished,
  setTodoIsEditing,
} = todosSlice.actions;

export default todosSlice.reducer;
