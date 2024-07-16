import express from "express";
import { Ingredient } from "./types";
import ingredientsRouter from "./routes/ingredients";
const app = express();

app.use(express.json());
app.use("/api/ingredients", ingredientsRouter);

/*
app.get("/api/ingredients", (req, res) => {
    //console.log(req.body);

    res.json(ingredientsData);
});
*/

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
