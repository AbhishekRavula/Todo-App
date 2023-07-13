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
      <ol>
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
  return <></>;
};
