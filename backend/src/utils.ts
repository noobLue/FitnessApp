import { NewIngredient } from "./types";

const isString = (v: unknown): v is string => {
  return typeof v === "string" || v instanceof String;
};

const isNumber = (v: unknown): v is number => {
  return typeof v === "number" || v instanceof Number;
};

const isObject = (body: unknown): body is object => {
  if (!body || typeof body !== "object") return false;

  return true;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) throw new Error(`Failed to parse string '${str}'`);

  return str;
};

const parseNumber = (num: unknown): number => {
  if (!isNumber(num)) throw new Error(`Failed to parse number '${num}'`);

  return num;
};

const parsePositiveNumber = (num: unknown): number => {
  const num2 = parseNumber(num);
  if (num2 < 0) throw new Error(`Number ${num} was supposed to be positive`);
  return num2;
};

export const toNewIngredient = (body: unknown): NewIngredient => {
  if (
    !body ||
    !isObject(body) ||
    !("name" in body) ||
    !("calories" in body) ||
    !("fat" in body) ||
    !("carbohydrates" in body) ||
    !("protein" in body)
  )
    throw new Error("Failed to parse request body");

  const newIngredient: NewIngredient = {
    name: parseString(body.name),
    calories: parsePositiveNumber(body.calories),
    fat: parsePositiveNumber(body.fat),
    carbohydrates: parsePositiveNumber(body.carbohydrates),
    protein: parsePositiveNumber(body.protein),
  };

  return newIngredient;
};
