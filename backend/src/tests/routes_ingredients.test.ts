import app from "../app";
import supertest from "supertest";
import { Ingredient, NewIngredient } from "../types";
import { SetIngredients } from "../data/ingredients";
import { default_ingredients, example_ingredient, invalid_ingredient } from "./ingredient_test_helper";

const api = supertest(app);

const ingredients_url = "/api/ingredients";

describe("ingredients api", () => {
  beforeEach(() => {
    SetIngredients(default_ingredients);
  });

  test("ingredients api returns json response", async () => {
    await api
      .get(ingredients_url)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("default ingredient is present in a get request", async () => {
    const res = await api.get(ingredients_url).expect(200);

    expect(res.body.length).toBeGreaterThan(0);

    const rest: Ingredient = res.body[0];

    expect(rest).toMatchObject(default_ingredients[0]);
  });

  test("ingredient is added on post", async () => {
    const post_res = await api.post(ingredients_url).send(example_ingredient).expect(201);

    let { id, ...rest } = post_res.body;

    expect(rest).toMatchObject(example_ingredient);

    const res = await api.get(ingredients_url);
    ({ id, ...rest } = res.body[res.body.length - 1]);
    expect(rest).toMatchObject(example_ingredient);
  });

  test("invalid ingredient is not added", async () => {
    const res = await api.post(ingredients_url).send(invalid_ingredient).expect(400);
    expect(res.body.error).toBeDefined();
  });

  test("ingredient is updated", async () => {
    const ingredient: NewIngredient = { name: "uusmaito", calories: 55, fat: 0, carbohydrates: 2, protein: 5 };
    const res = await api.put(`${ingredients_url}/${default_ingredients[0].id}`).send(ingredient).expect(201);

    let { id, ...rest } = res.body;
    expect(rest).toMatchObject(ingredient);

    // test that object is also saved
    const get_res = await api.get(ingredients_url);
    ({ id, ...rest } = get_res.body[0]);
    expect(rest).toMatchObject(ingredient);
  });
});
