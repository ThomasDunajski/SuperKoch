import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient, Heading}from '../types';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {Subject} from 'rxjs';


import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  units = ["g", "ml", "TL", "EL", "Stück", "Prise", "Schuss", "etwas", "Dose", "Bund", "Packung"]
  tags;
  selectedTags = [];
  progress: number = 0;
  pasteInstructionString="";
  constructor(public api: ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTags();
    this.loadRecipe();
  }
  async loadRecipe() {
    if (this.actRoute.snapshot.params.id){
      this.recipe = await this.api.getRecepie(this.actRoute.snapshot.params.id) as Recipe;
      this.recipe.ingredients.map(x => x.quantity *= this.recipe.servings);
      this.selectedTags = this.recipe.tags;
      //filter out already used tags
      this.tags = this.tags.filter(y => !this.selectedTags.some(x=> x.name.valueOf() === y.name.valueOf()));
      //filter out  "in saison"
      this.tags = this.tags.filter(x=> x.name.valueOf() !== "in Saison".valueOf());
      this.sortTags();
    }
  }
  addIngredient(){
    this.recipe.ingredients.push(new Ingredient());
  }
  addHeading(position: number){
    if(!this.recipe.headings){
      this.recipe.headings = [];
    }
    if (!this.getHeading(position)){
      this.recipe.headings.push(new Heading(position));
    }
  }
  getHeading(position: number){
    return this.recipe.headings ? this.recipe.headings.filter(x => x.position === position)[0] : null;
  }
  removeHeading(position: number){
    var index = this.recipe.headings.indexOf(this.getHeading(position));
    this.recipe.headings.splice(index, 1)
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
    if (!this.recipe.name || !this.recipe.servings){
      alert("Ein Rezept braucht einen Namen und die Anzahl der Portionen um gespeichert werden zu können");
      return
    }
    if (this.selectedTags.length < 1){
      alert("Ein Rezept braucht mindestens einen Tag um gespeichert werden zu können");
      return
    }
    this.recipe.instructions = this.recipe.instructions.filter(x => x !== "");
    this.recipe.ingredients.map(x=>x.quantity = x.quantity / this.recipe.servings);
    this.recipe.tags = this.selectedTags.map(x => x._id);
    console.log(this.recipe);
    this.api.addRecipe(this.recipe)
    .then((res:Response) => this.router.navigate([res.url]))
    .catch((err)=>console.log(err));
  }
  getAllTags = async function() {
      this.tags = await this.api.getAllTags();
  }
  addTag(tag){
    this.selectedTags.push(tag);
    this.tags = this.tags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
  }
  removeTag(tag){
    this.tags.push(tag);
    this.sortTags();
    this.selectedTags = this.selectedTags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
  }
  sortTags(){
    this.tags = this.tags.sort((x ,y) => ('' + x.name).localeCompare(y.name));
  }
  deleteImage(image, index){
    if (confirm('Sind Sie sicher, dass Sie das Bild löschen wollen?')) {
      console.log('call delete image: ' +image)
      this.api.deleteImage(image)
      .then(()=> this.recipe.images.splice(index, 1))
      .catch(err=> console.log(err));
    } else {
      // Do nothing!
    }

  }

    eventUplad: Subject<void> = new Subject<void>();
    showUploadModal() {
      this.eventUplad.next();
    }
    eventPasteRecipe: Subject<void> = new Subject<void>();
    showPasteRecipeModal() {
      this.eventPasteRecipe.next();
    }

    getInstructionId(index : number, employee : any) {
      return index;
    }
}
