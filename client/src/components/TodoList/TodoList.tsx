import { ITodoItem } from "../../types/todo";
import { TodoItem } from "../TodoItem";

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
      <ol style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
      </ol>
    );
  }
  return <div>No Tasks Yet. Add Some!</div>;
};
