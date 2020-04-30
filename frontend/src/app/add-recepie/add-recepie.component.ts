import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { RecepieComponent } from '../recepie/recepie.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {

  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  units = ["g", "ml", "TL", "EL", "Stück", "Dose","Priese", "Schuss", "etwas"]
  tags;
  selectedTags = [];
  form: FormGroup;
  progress: number = 0;
  constructor(private api: ApiService, private router: Router,public fb: FormBuilder,) { 
    this.form = this.fb.group({
    name: [''],
    image: [null]
  })}
  ngOnInit(): void {
    this.getAllTags();
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
    this.recipe.tags = this.selectedTags.map(x => x._id)
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

  getAllTags = function() {
    this.api.getAllTags(this.selected)
      .subscribe(data => {
        this.tags = data;
      },
      (error => {
        this.tags = [];
      }
      ));
  }
  addTag(tag){
    this.selectedTags.push(tag);
    this.tags = this.tags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
  }
  removeTag(tag){
    this.tags.push(tag);
    this.selectedTags = this.selectedTags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
  }

  submitUser() {
    this.api.uploadImage(
      this.form.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Image successfully uploaded', event.body);
          const resBody = JSON.parse(JSON.stringify(event.body));
          if (resBody.filename ===""){
            this.progress = 0;
          }
          else{
            this.recipe.imageUri = resBody.filename;
          }
          //setTimeout(() => {
          //  this.progress = 0;
          //}, 1500);

      }
    })
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity()
  }
}
