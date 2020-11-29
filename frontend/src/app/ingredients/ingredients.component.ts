import { Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit, OnChanges {

  constructor(private clipboardService: ClipboardService) { }
  entries=[];
  ngOnInit(): void {
    this.createCombinedIngredientsHeadingsEntires();
  }

  @Input() ingredients;
  @Input() headings;
  @Input() servings:number;

  incServings = function(){
    this.servings = ++this.servings;
  }
  decServings = function(){
    this.servings = --this.servings;
  }
  getQuantity(quantity){
    return quantity ? quantity * this.servings :"";
  }
  getHeading(position: number){
    return this.headings ? this.headings.filter(x => x.position === position)[0] : null;
  }
  createCombinedIngredientsHeadingsEntires(){
    this.entries = [];
    for (let index = 0; index < this.ingredients.length; index++) {
      if (this.getHeading(index)){
        this.entries.push(this.getHeading(index))
      }
      this.entries.push(this.ingredients[index]);
    }
  }
  copyToClipboard(){
    let ingredients:string = "";
    let quantitiy:number;
    let quantitiyString:string;
    this.ingredients
    .filter((ingredient)=> !ingredient.disabled)
    .map((ingredient)=> {
      quantitiy = ingredient.quantity * this.servings;
      // if quantity is 0 ignore it
      quantitiyString = quantitiy == 0 ? "" : quantitiy + " ";
      ingredients += ingredient.name + " " + quantitiyString.trim() + ingredient.unit.trim() + "\n"
    });
    this.clipboardService.copy(ingredients);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.createCombinedIngredientsHeadingsEntires();
  }
  ingredientClicked(ingredient){
    ingredient.disabled ? ingredient.disabled = false : ingredient.disabled = true
  }
}
