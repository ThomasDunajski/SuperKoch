import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe }from './types';
import { Observable } from 'rxjs';
import { isDevMode } from '@angular/core';

let localUrl = '';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
    if (isDevMode()){
      localUrl = "api/"
    }
 }
  getAllTags() {
    return this.http.get(localUrl + "tags").toPromise();
  }
  async getRecepie(number) {
    var recipe:Recipe = await  this.http.get(localUrl + "recipe/" + number).toPromise() as Recipe;
    recipe.imageUri = await this.getImageUri(recipe.imageUri);
    recipe.tags = recipe.tags.sort((a, b) => a.category.number - b.category.number)
    return recipe;
  }
  getRecepies(recipeNumbers) {
    return this.http.post(localUrl + "recipe/get-multiple/", {recipeNumbers:recipeNumbers}).toPromise();
  }
  getRecipeSearch(selectedTags, searchName:string, skip, limit) {
    var ids = [];
    var season = false;
    if (!skip) skip = 0;
    selectedTags.forEach(element => {
      if (element._id){
        // if tag is 'in Season' set season to true else add the tag
        element.name === "in Saison" ? season = true : ids.push(element._id)
      }
    });
    return this.http.post(localUrl+ "recipe/search", {selectedTags:ids, season: season, searchName: searchName, skip:skip, limit:limit}).toPromise();
  }
  addRecipe(recipe:Recipe) {
    return this.http.post(localUrl+ "recipe", {"recipe":recipe}).toPromise();
  }
  addTag(tag) {
    return this.http.post(localUrl+ "tags", {"tag":tag}).toPromise();
  }
  uploadImage(profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("file", profileImage);

    return this.http.post(localUrl+ 'images/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  getImageUri(name:string){
    return name ? localUrl + "images/" + name : localUrl + "images/no-image.png";
  }
  deleteImage(uri) {
    return this.http.delete(localUrl+ "images/" + uri).toPromise();
  }
  getCollection(number) {
    return this.http.get(localUrl + "collections/" + number).toPromise();
  }
  getCollections() {
    return this.http.get(localUrl + "collections").toPromise();
  }
  getAllRecipeTeaserData() {
    return this.http.get(localUrl + "recipe/teaser-data/all").toPromise();
  }
  saveCollection(collection){
    return this.http.post(localUrl+ "collections", {"collection":collection}).toPromise();
  }
}
