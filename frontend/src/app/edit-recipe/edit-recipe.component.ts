import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient, Heading}from '../recipe';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

 
  public addForm: FormGroup;
  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  units = ["g", "ml", "TL", "EL", "Stück", "Prise", "Schuss", "etwas", "Dose", "Bund", "Packung"]
  tags;
  selectedTags = [];
  form: FormGroup;
  progress: number = 0;
  instructions =[{value:""}];
  constructor(private api: ApiService, private router: Router,public fb: FormBuilder, private actRoute: ActivatedRoute) { 
    this.form = this.fb.group({
    name: [''],
    image: [null]
  })}
  ngOnInit(): void {
    this.getAllTags();
    this.loadRecipe();
  }
  async loadRecipe() {
    if (this.actRoute.snapshot.params.id){
      this.recipe = await this.api.getRecepie(this.actRoute.snapshot.params.id) as Recipe;
      this.instructions = [];
      this.recipe.instructions.map( x=> this.instructions.push({value:x}));
      this.recipe.ingredients.map(x => x.quantity *= this.recipe.servings);
      this.selectedTags = this.recipe.tags;
      //filter out already used tags
      this.tags = this.tags.filter(y => !this.selectedTags.some(x=> x.name.valueOf() === y.name.valueOf()));
      //filter out  "in saison"
      this.tags = this.tags.filter(x=> x.name.valueOf() !== "in Saison".valueOf())
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
    this.instructions.push({value:""});
  }
  removeInctruction(index:number){
    this.instructions.splice(index, 1)
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
    this.recipe.instructions = this.instructions.map( x=> x.value)
    .filter(x => x !== "");
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
    this.selectedTags = this.selectedTags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
  }


  uploadImage() {
    var blob = this.dataURItoBlob(this.croppedImage);
    var file = new File([blob], "fileName.jpeg", {
      type: "image/jpeg"
    });
    this.api.uploadImage(
      file
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
            console.log(this.recipe.imageUri);
          }
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



  dataURItoBlob(dataURI) {

    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}




    imageChangedEvent: any = '';
    croppedImage: any = '';

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
}
