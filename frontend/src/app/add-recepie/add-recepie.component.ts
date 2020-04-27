import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { RecepieComponent } from '../recepie/recepie.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {

  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  units = ["g", "ml", "TL", "EL", "Stück", "Dose"]
  constructor(private api: ApiService, private router: Router) { }
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
  onCheckboxChange(isChecked: boolean){
    this.isSesonal = isChecked;
  }
  onSesonChanged(value:string[]){
    this.recipe.season = value.map(Number);
  }
  saveRecipe(){
    this.recipe.ingredients.map(x=>x.quantity = x.quantity / this.recipe.servings)
    console.log(this.recipe)
    this.api.addRecipe(this.recipe).subscribe(data => {
      // TODO
      //this.router.navigateByUrl("/")
    },
    (error => {

    }
    ));
  }
  change(){
    console.log(this.recipe.name)
  }
}
