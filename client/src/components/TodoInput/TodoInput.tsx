import { useState } from "react";

export const TodoInput = ({
  onAddTodo,
}: {
  onAddTodo: (newTodoName: string) => void;
}) => {
  const [todoName, setTodoName] = useState("");

  const onTodoInputChange = (e: any) => {
    setTodoName(e.target.value);
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    setTodoName("");
    onAddTodo(todoName);
  };

  return (
    <form
      role="form"
      onSubmit={handleAddTodo}
      style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
    >
      <input
        type="text"
        value={todoName}
        onChange={onTodoInputChange}
        data-testid="add-new-item-input"
      />
      <button
        type="submit"
        onClick={handleAddTodo}
        data-testid="add-new-item-button"
        disabled={todoName.length === 0}
        style={{ backgroundColor: "blue" }}
      >
        Add
      </button>
    </form>
  );
};
