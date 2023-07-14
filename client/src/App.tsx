import { useEffect, useState } from "react";
import "./App.css";
import { TodoInput, TodoList } from "./components";
import { ITodoItem } from "./types/todo";
import { cloneDeep } from "lodash";

function App() {
  const [todoList, setTodoList] = useState<Array<ITodoItem>>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      const res = await fetch(`${apiUrl}/todos`);
      const todoList = await res.json();
      setTodoList(todoList);
    } catch (error) {
      console.log("error", error);
    }
  }

  const onAddTodo = async (newTodoName: string) => {
    try {
      const res = await fetch(`${apiUrl}/todos`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTodoName }),
      });
      const newTodoList = await res.json();
      setTodoList([...todoList, newTodoList]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onUpdateTodo = async (toUpdateTodoItem: ITodoItem) => {
    try {
      const res = await fetch(`${apiUrl}/todos/${toUpdateTodoItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUpdateTodoItem),
      });
      const updatedTodoItem = (await res.json()) as ITodoItem;

      const updatedTodosList = cloneDeep(todoList);

      const todoItemIndex = updatedTodosList.findIndex(
        (todoItem) => todoItem.id === updatedTodoItem.id
      );

      updatedTodosList[todoItemIndex] = {
        ...todoList[todoItemIndex],
        ...updatedTodoItem,
      };

      setTodoList(updatedTodosList);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDeleteTodo = async (todoItemId: String) => {
    try {
      const res = await fetch(`${apiUrl}/todos/${todoItemId}`, {
        method: "DELETE",
      });
      const updatedTodList = (await res.json()) as ITodoItem[];

      setTodoList(updatedTodList);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList
        todos={todoList}
        onUpdate={onUpdateTodo}
        onDelete={onDeleteTodo}
      />
    </div>
  );
}

export default App;
