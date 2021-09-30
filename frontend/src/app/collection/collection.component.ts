import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../types';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  constructor(private api: ApiService, private actRoute: ActivatedRoute) {}
  teaser;
  async ngOnInit() {
    await this.getCollection(this.actRoute.snapshot.params.id);
    this.collection.sections.forEach((section) => {
      this.summary.recipeCount += section.recipes.length;
    });
  }

  collection;
  selectedRecipes: Recipe[] = [];
  selectedRecipeNumbers: number[] = [];
  summary = {
    ingredients: [],
    recipeCount: 0,
  };
  getCollection = async function (number) {
    this.collection = await this.api.getCollection(number);
    this.teaser = {
      imageUrl: this.collection.imageUrl,
      head: this.collection.name,
      text: this.collection.text,
    };
  };

  checkboxChanged(event, recipeNumber) {
    event.stopPropagation();
    var index = this.selectedRecipeNumbers.indexOf(recipeNumber);
    if (index >= 0) {
      this.selectedRecipeNumbers.splice(index, 1);
    } else {
      this.selectedRecipeNumbers.push(recipeNumber);
    }
    this.updateSummary();
  }

  updateSummary() {
    //update selected recipes
    let recipes: Recipe[] = [];
    this.collection.sections.forEach((section) => {
      recipes = recipes.concat(
        section.recipes.filter(
          (recipe) => this.selectedRecipeNumbers.indexOf(recipe.number) >= 0
        )
      );
    });
    this.selectedRecipes = recipes;

    //update ingredients list
    let ingredients = [];
    recipes.forEach(
      (recipe) => (ingredients = ingredients.concat(recipe.ingredients))
    );
    this.summary.ingredients = ingredients;
  }
}
