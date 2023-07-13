import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:5005/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1",
          name: "Build TDD demo app",
          completed: false,
        },
        {
          id: "2",
          name: "Drink Water",
          completed: true,
        },
      ])
    );
  }),
  rest.post("http://localhost:5005/todos", async (req, res, ctx) => {
    const reqBody = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        id: "3",
        name: reqBody.name,
        completed: false,
      })
    );
  }),

  rest.patch("http://localhost:5005/todos/:id", async (req, res, ctx) => {
    const newTodoItem = await req.json();
    return res(ctx.status(200), ctx.json(newTodoItem));
  }),

  rest.delete("http://localhost:5005/todos/:id", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
