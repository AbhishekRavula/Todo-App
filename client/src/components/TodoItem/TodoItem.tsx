import { useState } from "react";
import { ITodoItem } from "../../types/todo";
import "./TodoItem.css";

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
      <form onSubmit={handleOnUpdate}>
        <input
          type="text"
          value={todoItemName}
          onChange={onTodoItemNameCange}
          data-testid={"edit-item-input" + todoItem.name}
        />
        <button type="submit" data-testid={"update-item" + todoItem.name}>
          update
        </button>
      </form>
    );
  }

  return (
    <div className="todo-item-container">
      <li>{todoItem.name}</li>
      {todoItem.completed ? (
        <div data-testid={"completed-todo-item" + todoItem.name}>completed</div>
      ) : (
        <>
          <button
            onClick={onEdit}
            data-testid={"edit-todo-item" + todoItem.name}
          >
            edit
          </button>
          <button
            onClick={handleMarkComplete}
            data-testid={"mark-complete-todo-item" + todoItem.name}
          >
            mark as complete
          </button>
        </>
      )}
      <button
        data-testid={"delete-todo-item" + todoItem.name}
        onClick={handleOnDelete}
      >
        delete
      </button>
    </div>
  );
};
