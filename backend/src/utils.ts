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
  if (!str || !isString(str)) throw new Error("Failed to parse string");

  return str;
};

const parseNumber = (num: unknown): number => {
  if (!num || !isNumber(num)) throw new Error("Failed to parse number");

  return num;
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
    calories: parseNumber(body.calories),
    fat: parseNumber(body.fat),
    carbohydrates: parseNumber(body.carbohydrates),
    protein: parseNumber(body.protein),
  };

  return newIngredient;
};
