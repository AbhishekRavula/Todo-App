import express from "express";
import todosRouter from "./routes/todos";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/todos", todosRouter);

export default app;
