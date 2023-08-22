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
      const res = await fetch(`${apiUrl}/todos/${toUpdateTodoItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toUpdateTodoItem),
      });
      const updatedTodoItem = (await res.json()) as ITodoItem;

      const updatedTodosList = cloneDeep(todoList);

      const todoItemIndex = updatedTodosList.findIndex(
        (todoItem) => todoItem._id === updatedTodoItem._id
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

  const onDeleteTodo = async (todoItemId: string) => {
    try {
      const res = await fetch(`${apiUrl}/todos/${todoItemId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setTodoList(prevTodoList =>
          prevTodoList.filter(prevList => prevList._id !== todoItemId)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
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
