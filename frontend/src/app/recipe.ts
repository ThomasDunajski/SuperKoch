export class Recipe {
  _id: Id;
  servings: number;
  number: number;
  imageUri: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  portions: number;
  cookingDuration: number;
  restDuration: number;
  tags: string[];
  season: number[];
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Id {
  '$oid': string;
}