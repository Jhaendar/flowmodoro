import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/features/todos/todosSlice";
import TodoItem from "./TodoItem";

// Helper function to create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
  });
};

describe("TodoItem", () => {
  const mockTodo = {
    id: "test-id-123",
    content: "Test todo item",
    isFinished: false,
    isEditing: false,
  };

  it("renders todo content correctly", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={mockTodo} />
      </Provider>
    );

    expect(screen.getByText("Test todo item")).toBeInTheDocument();
  });

  it("shows checkbox that can be toggled", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={mockTodo} />
      </Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("renders finished todo with strikethrough", () => {
    const finishedTodo = { ...mockTodo, isFinished: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={finishedTodo} />
      </Provider>
    );

    const todoText = screen.getByText("Test todo item");
    expect(todoText).toHaveClass("line-through");
    expect(todoText).toHaveClass("text-gray-400");
  });

  it("shows edit input when isEditing is true", () => {
    const editingTodo = { ...mockTodo, isEditing: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={editingTodo} />
      </Provider>
    );

    const input = screen.getByDisplayValue("Test todo item");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("shows edit and delete buttons when not editing", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={mockTodo} />
      </Provider>
    );

    // Should have edit button (pencil icon) and delete button (trash icon)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("shows save and cancel buttons when editing", () => {
    const editingTodo = { ...mockTodo, isEditing: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={editingTodo} />
      </Provider>
    );

    // Should have save button (check icon) and cancel button (X icon)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("updates input value when typing", () => {
    const editingTodo = { ...mockTodo, isEditing: true };
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TodoItem todo={editingTodo} />
      </Provider>
    );

    const input = screen.getByDisplayValue("Test todo item");
    fireEvent.change(input, { target: { value: "Updated todo" } });

    expect(input).toHaveValue("Updated todo");
  });
});
