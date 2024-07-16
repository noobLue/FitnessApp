// Data
export interface Ingredient {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbohydrates: number;
  protein: number;
}

export type NewIngredient = Omit<Ingredient, "id">;

// dynamic instance of data
export interface IngredientEntry {
  ingredient: Ingredient; // TODO: change to id?
  grams: number;
}

// Data
export interface CompoundFood {
  id: number;
  name: string;
  ingredients: IngredientEntry[];
}

export type NewCompoundFood = Omit<CompoundFood, "id">;

// dynamic instance of data
export interface CompoundFoodEntry {
  compoundFood: CompoundFood; // TODO: change to id?
  grams: number;
}

// Type that can be added to food log
export type Food = IngredientEntry | CompoundFoodEntry;
