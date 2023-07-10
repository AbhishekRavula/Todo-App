import express from "express";
import todosRouter from "./routes/todos";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/todos", todosRouter);

export default app;
