import express from "express";
import todosRoute from "./routes/todos";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", todosRoute);

export default app;
