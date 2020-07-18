import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor() { }
  entries=[];
  ngOnInit(): void {
    for (let index = 0; index < this.ingredients.length; index++) {
      if (this.getHeading(index)){
        this.entries.push(this.getHeading(index))
      }
      this.entries.push(this.ingredients[index]);
    }
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
    return this.headings.filter(x => x.position === position)[0];
  }
}
