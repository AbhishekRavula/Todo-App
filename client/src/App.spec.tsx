import App from "./App.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddAndGetNewTodoItem } from "./test/utils/index.tsx";

describe("Todo App", () => {
  it("it should render todo list", async () => {
    render(<App />);
    const todoList = await screen.findByRole("list");
    const todoListItems = await screen.findAllByRole("listitem");
    expect(todoList).toBeInTheDocument();
    for (const todoListItem of todoListItems) {
      expect(todoListItem).toBeInTheDocument();
    }
  });

  it("it should add new todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Drink Water");
    expect(newTodoItem).toBeInTheDocument();
  });

  it("it should update todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Eat");
    expect(newTodoItem).toBeInTheDocument();

    const newTodoItemEditButton = screen.getByTestId("edit-todo-item" + "Eat");

    fireEvent.click(newTodoItemEditButton);

    const newTodoItemEditInput = screen.getByTestId("edit-item-input" + "Eat");

    fireEvent.change(newTodoItemEditInput, { target: { value: "Ate" } });

    const newTodoItemUpdate = screen.getByTestId("update-item" + "Eat");

    fireEvent.click(newTodoItemUpdate);

    const updatedTodoItem = await screen.findByText("Ate");

    expect(updatedTodoItem).toBeInTheDocument();
  });

  it("it should mark todo item as completed", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Watch movie");
    expect(newTodoItem).toBeInTheDocument();

    const todoItemMarkCompleteButton = screen.getByTestId(
      "mark-complete-todo-item" + "Watch movie"
    );

    fireEvent.click(todoItemMarkCompleteButton);

    const todoItemCompleted = await screen.findByTestId(
      "completed-todo-item" + "Watch movie"
    );

    expect(todoItemCompleted).toBeInTheDocument();
  });

  it("it should delete todo item", async () => {
    const newTodoItem = await AddAndGetNewTodoItem("Learn TDD");
    expect(newTodoItem).toBeInTheDocument();

    const todoItemMarkCompleteButton = screen.getByTestId(
      "delete-todo-item" + "Learn TDD"
    );

    fireEvent.click(todoItemMarkCompleteButton);

    await waitFor(() => {
      expect(todoItemMarkCompleteButton).not.toBeInTheDocument();
    });
  });
});