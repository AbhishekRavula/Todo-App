import express, { Request, Response } from "express";

const router = express.Router();

interface ITodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export let todosList: Array<ITodoItem> = [
  {
    id: "1",
    name: "Build Todo app",
    completed: false,
  },
  {
    id: "2",
    name: "Drink Water",
    completed: true,
  },
];

// getting todo items
router.get("/", (req: Request, res: Response) => {
  return res.status(200).json(todosList);
});

// getting specific todo item
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const todoItem = todosList.find((todoItem) => todoItem.id === id);

  if (todoItem) {
    return res.status(200).json(todoItem);
  }

  return res.status(404).end();
});

// creating todo item
router.post("/", (req: Request, res: Response) => {
  const newTodoItemName = req.body.name;
  if (!newTodoItemName || typeof newTodoItemName !== "string") {
    return res.status(400).end();
  }

  const newTodoItem = {
    id: todosList.length + 1 + "",
    name: newTodoItemName,
    completed: false,
  };

  todosList.push(newTodoItem);

  return res.json(newTodoItem);
});

// updating todo item
router.patch("/:id", (req: Request, res: Response) => {
  const todoData = req.body;
  const id = req.params.id;
  const todoItemIndex = todosList.findIndex((todoItem) => todoItem.id === id);

  if (
    todoItemIndex === -1 ||
    (todoData.completed && typeof todoData.completed !== "boolean") ||
    (todoData.name && typeof todoData.name !== "string")
  ) {
    return res.status(400).end();
  }

  todosList[todoItemIndex] = {
    ...todosList[todoItemIndex],
    ...todoData,
  };

  return res.status(200).json(todosList[todoItemIndex]);
});

//deleting todo item
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const todoItemIndex = todosList.findIndex((todoItem) => todoItem.id === id);

  if (todoItemIndex === -1) {
    return res.status(400).end();
  }

  todosList.splice(todoItemIndex, 1);

  return res.status(200).json(todosList);
});

export default router;
