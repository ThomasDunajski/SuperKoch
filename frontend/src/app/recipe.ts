export class Recipe {
  _id: Id;
  servings: number;
  number: number;
  imageUri: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingDuration: number;
  restDuration: number;
  tags: string[];
  season: number[];
  constructor() {
    this.name = "";
    this.servings = null;
    this.number = null;
    this.imageUri = "";
    this.ingredients = [];
    this.instructions = [];
    this.cookingDuration = null;
    this.restDuration = null;
    this.tags = [];
    this.season = [];
    this.ingredients.push(new Ingredient());
    this.instructions.push("");
}
}

export class Ingredient {
  name: string;
  quantity: number;
  unit: string;
  constructor(){
    this.name = "";
    this.quantity = null;
    this.unit = "";
  }
}

interface Id {
  '$oid': string;
}