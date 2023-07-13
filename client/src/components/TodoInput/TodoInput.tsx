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
    onAddTodo(todoName);
  };

  return (
    <form role="form" onSubmit={handleAddTodo}>
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
      >
        Add
      </button>
    </form>
  );
};
