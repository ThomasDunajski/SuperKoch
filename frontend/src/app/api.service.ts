import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe , Ingredient}from './recipe';
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
  getRecepie(number) {
    return this.http.get(localUrl + "recepie/" + number).toPromise();
  }
  getRecipeSearch(selectedTags, searchName:string, skip, limit) {
    var ids = [];
    var season = false;
    if (!skip) skip = 0;
    selectedTags.forEach(element => {
      if (element._id){
        ids.push(element._id);
      }
      else if(element.name === "in Saison")
      {
        season = true;
      }
    });
    return this.http.post(localUrl+ "recepie/search", {selectedTags:ids, season: season, searchName: searchName, skip:skip, limit:limit}).toPromise();;
  }
  addRecipe(recipe:Recipe) {
    return this.http.post(localUrl+ "recepie", {"recipe":recipe}).toPromise();
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
}
