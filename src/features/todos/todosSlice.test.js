import { describe, it, expect } from "vitest";
import todosReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  setTodoIsFinished,
  setTodoIsEditing,
} from "./todosSlice";

describe("todosSlice", () => {
  const initialState = {
    todos: {},
  };

  it("should return initial state", () => {
    expect(todosReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    const actual = todosReducer(
      initialState,
      addTodo({
        content: "Test todo",
        isEditing: false,
        isFinished: false,
      })
    );

    const todoIds = Object.keys(actual.todos);
    expect(todoIds.length).toBe(1);

    const addedTodo = actual.todos[todoIds[0]];
    expect(addedTodo.content).toBe("Test todo");
    expect(addedTodo.isEditing).toBe(false);
    expect(addedTodo.isFinished).toBe(false);
    expect(addedTodo.id).toBeDefined();
  });

  it("should handle updateTodo", () => {
    const stateWithTodo = {
      todos: {
        "test-id": {
          id: "test-id",
          content: "Original content",
          isEditing: false,
          isFinished: false,
        },
      },
    };

    const actual = todosReducer(
      stateWithTodo,
      updateTodo({
        id: "test-id",
        content: "Updated content",
      })
    );

    expect(actual.todos["test-id"].content).toBe("Updated content");
  });

  it("should handle deleteTodo", () => {
    const stateWithTodo = {
      todos: {
        "test-id": {
          id: "test-id",
          content: "Test todo",
          isEditing: false,
          isFinished: false,
        },
      },
    };

    const actual = todosReducer(
      stateWithTodo,
      deleteTodo({
        id: "test-id",
      })
    );

    expect(actual.todos["test-id"]).toBeUndefined();
    expect(Object.keys(actual.todos).length).toBe(0);
  });

  it("should handle setTodoIsFinished", () => {
    const stateWithTodo = {
      todos: {
        "test-id": {
          id: "test-id",
          content: "Test todo",
          isEditing: false,
          isFinished: false,
        },
      },
    };

    const actual = todosReducer(
      stateWithTodo,
      setTodoIsFinished({
        id: "test-id",
        isFinished: true,
      })
    );

    expect(actual.todos["test-id"].isFinished).toBe(true);
  });

  it("should handle setTodoIsEditing", () => {
    const stateWithTodo = {
      todos: {
        "test-id": {
          id: "test-id",
          content: "Test todo",
          isEditing: false,
          isFinished: false,
        },
      },
    };

    const actual = todosReducer(
      stateWithTodo,
      setTodoIsEditing({
        id: "test-id",
        isEditing: true,
      })
    );

    expect(actual.todos["test-id"].isEditing).toBe(true);
  });

  it("should handle multiple todos", () => {
    let state = initialState;

    // Add first todo
    state = todosReducer(
      state,
      addTodo({
        content: "First todo",
        isEditing: false,
        isFinished: false,
      })
    );

    // Add second todo
    state = todosReducer(
      state,
      addTodo({
        content: "Second todo",
        isEditing: false,
        isFinished: false,
      })
    );

    expect(Object.keys(state.todos).length).toBe(2);
  });
});
