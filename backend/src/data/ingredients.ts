import { Ingredient, NewIngredient } from "../types";

let data: Ingredient[] = [
  {
    id: 1,
    name: "Taysmaito",
    calories: 64,
    fat: 2.4,
    carbohydrates: 4.8,
    protein: 3.4,
  },
];

export const SetIngredients = (ingredients: Ingredient[]) => {
  data = ingredients;
};

export const AddIngredient = (ingredient: NewIngredient): Ingredient => {
  const i: Ingredient = {
    id: data.length + 1,
    ...ingredient,
  };

  data.push(i);

  return i;
};

export const UpdateIngredient = (id: number, ingredient: NewIngredient): Ingredient | undefined => {
  const found = data.find((i) => i.id === id);
  const fullIngredient = { ...ingredient, id };

  if (found) {
    data = data.map((i) => (i.id === id ? fullIngredient : i));
    return fullIngredient;
  } else {
    return undefined;
  }
};

export const GetIngredients = (): Ingredient[] => {
  return data;
};
