import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { ImageCroppedEvent } from 'ngx-image-cropper';

interface Response {
  message: string
  url?: string
}

@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {

  public addForm: FormGroup;
  recipe:Recipe = new Recipe();
  isSesonal:boolean;
  units = ["g", "ml", "TL", "EL", "Stück", "Prise", "Schuss", "etwas", "Dose", "Bund"]
  tags;
  selectedTags = [];
  form: FormGroup;
  progress: number = 0;
  instructions =[{value:""}];
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
    this.recipe.instructions = this.instructions.map( x=> x.value)
    this.recipe.ingredients.map(x=>x.quantity = x.quantity / this.recipe.servings)
    this.recipe.tags = this.selectedTags.map(x => x._id)
    console.log(this.recipe)
    this.api.addRecipe(this.recipe)
    //.then((response)=>this.router.navigate([response.url]))
    .then((res:Response) => this.router.navigate([res.url]))
    .catch((err)=>console.log(err));
  }
  change(){
    console.log(this.recipe.name)
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

  submitUser() {
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
