import { Ingredient, NewIngredient } from "../types";

export const default_ingredients: Ingredient[] = [
  {
    id: 1,
    name: "Taysmaito",
    calories: 64,
    fat: 2.4,
    carbohydrates: 4.8,
    protein: 3.4,
  },
  {
    id: 2,
    name: "Kevytmaito",
    calories: 54,
    fat: 1.5,
    carbohydrates: 4.8,
    protein: 3.4,
  },
];

export const example_ingredient: NewIngredient = {
  name: "Kevytmaito",
  calories: 47,
  fat: 1.5,
  carbohydrates: 4.8,
  protein: 3.5,
};

export const invalid_ingredient = {
  name: "Fake product",
  calories: 99,
  protein_shaker: "included",
  sponsor: "formula1",
};

export const ingredient_negativeval = {
  name: "Kevytmaito",
  calories: -100,
  fat: 1.5,
  carbohydrates: 4.8,
  protein: 3.5,
};
