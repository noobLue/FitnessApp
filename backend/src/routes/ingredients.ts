import express from "express";
import { AddIngredient, GetIngredients, UpdateIngredient } from "../data/ingredients";
import { toNewIngredient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(GetIngredients());
});

router.get("/:id", (req, res) => {
  const ingredients = GetIngredients();
  let ingredient = ingredients.find((i) => i.id === Number(req.params.id));

  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(404).json({ error: "Incorrect id" });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);

  try {
    const newIngredient = toNewIngredient(req.body);

    const ingredient = AddIngredient(newIngredient);

    res.json(ingredient);
  } catch (e: unknown) {
    res.json({ error: "unknown error" });
  }
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    const newIngredient = toNewIngredient(req.body);

    const ingredient = UpdateIngredient(id, newIngredient);

    res.json(ingredient);
  } catch (e: unknown) {
    res.json({ error: "unknown error" });
  }
});

export default router;
