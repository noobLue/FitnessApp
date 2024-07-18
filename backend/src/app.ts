import express from "express";
import ingredientsRouter from "./routes/ingredients";
const app = express();

app.use(express.json());
app.use("/api/ingredients", ingredientsRouter);

export default app;
