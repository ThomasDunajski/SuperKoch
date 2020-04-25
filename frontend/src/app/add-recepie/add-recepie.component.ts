import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { RecepieComponent } from '../recepie/recepie.component';

@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {

  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  constructor() { }
  ngOnInit(): void {
  }

  addIngredient(){
    this.recipe.ingredients.push(new Ingredient());
  }

  removeIngredient(index:number){
    this.recipe.ingredients.splice(index, 1)
  }
  addInstruction(){
    this.recipe.instructions.push("");
  }

  removeInctruction(index:number){
    this.recipe.instructions.splice(index, 1)
  }
  onChange(isChecked: boolean){
    this.isSesonal = isChecked;
  }
  
  units = ["g", "ml"];
}
