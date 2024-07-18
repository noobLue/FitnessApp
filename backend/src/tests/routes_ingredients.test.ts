import app from "../app";
import supertest from "supertest";
import { Ingredient, NewIngredient } from "../types";
import { SetIngredients } from "../data/ingredients";

const api = supertest(app);

const ingredients_url = "/api/ingredients";

const default_ingredient_id = 1;
const default_ingredient: NewIngredient = {
  name: "Taysmaito",
  calories: 64,
  fat: 2.4,
  carbohydrates: 4.8,
  protein: 3.4,
};

const example_ingredient: NewIngredient = {
  name: "Kevytmaito",
  calories: 47,
  fat: 1.5,
  carbohydrates: 4.8,
  protein: 3.5,
};

const invalid_ingredient = {
  name: "Fake product",
  calories: 99,
  protein_shaker: "included",
  sponsor: "formula1",
};

describe("ingredients api", () => {
  beforeEach(() => {
    const ingredient: Ingredient = { id: default_ingredient_id, ...default_ingredient };
    SetIngredients([ingredient]);
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

    const { id, ...rest } = res.body[0];
    expect(rest).toMatchObject(default_ingredient);
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
    const res = await api.put(`${ingredients_url}/${default_ingredient_id}`).send(ingredient).expect(201);

    let { id, ...rest } = res.body;
    expect(rest).toMatchObject(ingredient);

    // test that object is also saved
    const get_res = await api.get(ingredients_url);
    ({ id, ...rest } = get_res.body[0]);
    expect(rest).toMatchObject(ingredient);
  });
});
