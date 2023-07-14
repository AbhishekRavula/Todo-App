import { useState } from "react";
import { ITodoItem } from "../../types/todo";

export const TodoItem = ({
  todoItem,
  onUpdate,
  onDelete,
}: {
  todoItem: ITodoItem;
  onUpdate: (updatedTodoItem: ITodoItem) => void;
  onDelete: (todoItemId: String) => void;
}) => {
  const [todoItemName, setTodoItemName] = useState(todoItem.name);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onTodoItemNameCange = (e: any) => {
    setTodoItemName(e.target.value);
  };

  const handleOnUpdate = (e: any) => {
    e.preventDefault();
    onUpdate({
      ...todoItem,
      name: todoItemName,
    });
    setIsEditing(false);
  };

  const handleMarkComplete = () => {
    onUpdate({
      ...todoItem,
      completed: true,
    });
  };

  const handleOnDelete = () => {
    onDelete(todoItem.id);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleOnUpdate} style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={todoItemName}
          onChange={onTodoItemNameCange}
          data-testid={"edit-item-input" + todoItem.name}
        />
        <button
          type="submit"
          data-testid={"update-item" + todoItem.name}
          style={{ backgroundColor: "blue" }}
        >
          update
        </button>
      </form>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <li>{todoItem.name}</li>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {todoItem.completed ? (
          <div
            data-testid={"completed-todo-item" + todoItem.name}
            style={{
              padding: "0.5rem",
              backgroundColor: "green",
              borderRadius: "1rem",
            }}
          >
            completed
          </div>
        ) : (
          <>
            <button
              onClick={onEdit}
              data-testid={"edit-todo-item" + todoItem.name}
              style={{ backgroundColor: "blue" }}
            >
              edit
            </button>
            <button
              onClick={handleMarkComplete}
              data-testid={"mark-complete-todo-item" + todoItem.name}
              style={{ backgroundColor: "blue" }}
            >
              mark as complete
            </button>
          </>
        )}
        <button
          data-testid={"delete-todo-item" + todoItem.name}
          onClick={handleOnDelete}
          style={{ backgroundColor: "red" }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
