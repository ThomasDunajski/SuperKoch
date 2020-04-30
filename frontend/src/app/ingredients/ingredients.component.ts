import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() ingredients;
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
}
