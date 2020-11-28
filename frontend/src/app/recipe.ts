export class Recipe {
  _id: Id;
  servings: number;
  number: number;
  imageUri: string;
  name: string;
  ingredients: Ingredient[];
  headings: Heading[];
  instructions: string[];
  cookingDuration: number;
  restDuration: number;
  tags: Tag[];
  season: number[];
  constructor() {
    this.name = "";
    this.servings = null;
    this.number = null;
    this.imageUri = "";
    this.ingredients = [];
    this.instructions = [];
    this.headings = [];
    this.cookingDuration = null;
    this.restDuration = null;
    this.tags = [];
    this.season = [];
    this.ingredients.push(new Ingredient());
    this.instructions.push("");
  }
}
export class Tag{
  name:string;
  category:{
    name:string;
    number:number;
  }
}
export class Heading{
  text: string;
  position: number;
  constructor(position){
    this.text = "";
    this.position = position;
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