import { ITodoItem } from "../../types/todo";
import { TodoItem } from "../TodoItem";
import "./TodoList.css";

export const TodoList = ({
  todos,
  onUpdate,
  onDelete,
}: {
  todos: Array<ITodoItem>;
  onUpdate: (updatedTodoItem: ITodoItem) => void;
  onDelete: (todoItemId: String) => void;
}) => {
  if (todos && todos.length) {
    return (
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todoItem={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    );
  }
  return <div className="empty-todo-list">No Todos Yet. Add Some!</div>;
};
