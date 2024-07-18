import { AddIngredient, GetIngredients, SetIngredients, UpdateIngredient } from "../data/ingredients";
import { NewIngredient } from "../types";
import { default_ingredients, example_ingredient, ingredient_negativeval } from "./ingredient_test_helper";

describe("ingredients data test", () => {
  beforeEach(() => {
    SetIngredients(default_ingredients);
  });

  test("Default ingredients are present", () => {
    const ingredients = GetIngredients();
    expect(ingredients).toContain(default_ingredients[0]);
    expect(ingredients).toContain(default_ingredients[1]);
  });

  test("New ingredient is added", () => {
    AddIngredient(example_ingredient);
    const newIngredients = GetIngredients();
    const { id, ...rest } = newIngredients[newIngredients.length - 1];
    expect(rest).toMatchObject(example_ingredient);
  });

  test("Ingredient with negative calories is not added", () => {
    AddIngredient(ingredient_negativeval);

    const ingredients = GetIngredients();
    expect(ingredients).toContain(default_ingredients[0]);
    expect(ingredients).toContain(default_ingredients[1]);
  });

  test("Ingredient is changed", () => {
    const newIngredient: NewIngredient = { name: "Chocolate", calories: 300, carbohydrates: 3, fat: 30, protein: 3 };
    UpdateIngredient(default_ingredients[0].id, newIngredient);
    const newIngredients = GetIngredients();
    const i = newIngredients.find((ia) => ia.id === default_ingredients[0].id);
    expect(i).toBeDefined();
    if (i) {
      const { id, ...rest } = i;
      expect(rest).toMatchObject(newIngredient);
    }
  });
});
