import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe , Ingredient}from './recipe';
import { Observable } from 'rxjs';

const localUrl = 'api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getRecomandedTags(selectedTags) {
    return this.http.post(localUrl+ "tags/recomanded", {selectedTags:selectedTags}).toPromise();
  }
  getAllTags() {
    return this.http.get(localUrl + "tags").toPromise();
  }
  getRecepie(number) {
    return this.http.get(localUrl + "recepie/" + number).toPromise();
  }
  getRecepieTagSearch(selectedTags) {
    var ids = [];
    var season = false;
    selectedTags.forEach(element => {
      if (element._id){
        ids.push(element._id);
      }
      else if(element.name === "in Saison")
      {
        season = true;
      }
    });
    return this.http.post(localUrl+ "recepie/search", {selectedTags:ids, season: season});
  }
  addRecipe(recipe:Recipe) {
    return this.http.post(localUrl+ "recepie", {"recipe":recipe});
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
    return localUrl + "images/" + name;
  }
}
