import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe , Ingredient}from './recipe';

const localUrl = 'api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getRecomandedTags(selectedTags) {
    return this.http.post(localUrl+ "tags/recomanded", {selectedTags:selectedTags});
  }
  getAllTags() {
    return this.http.get(localUrl + "/tags");
  }
  getRecepie(number) {
    return this.http.get(localUrl + "recepie/" + number);
  }
  getRecepieTagSearch(selectedTags) {
    var ids = [];
    selectedTags.forEach(element => {
      ids.push(element._id);
    });
    return this.http.post(localUrl+ "recepie/TagSearch", {selectedTags:ids});
  }
  addRecipe(recipe:Recipe) {
    return this.http.post(localUrl+ "recepie", {"recipe":recipe});
  }
}
