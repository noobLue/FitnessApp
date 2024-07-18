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
  try {
    const newIngredient = toNewIngredient(req.body);

    const ingredient = AddIngredient(newIngredient);

    res.status(201).json(ingredient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ message: "unknown error" });
    }
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const newIngredient = toNewIngredient(req.body);

    const ingredient = UpdateIngredient(id, newIngredient);

    res.status(201).json(ingredient);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    } else {
      res.status(400).json({ message: "unknown error" });
    }
  }
});

export default router;
