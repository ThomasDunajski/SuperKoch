import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

export interface Tag {
  name: string;
  category: {
    name: string;
    number: number;
  };
  _id: string;
}

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css'],
})
export class TagSearchComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  recepies = [];
  searchName: string = '';
  selectedTags = [];
  previewClass;
  autoCompleteSugestions: string[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      this.previewClass = params.previewClass || 'img-only';
      this.searchName = params.searchName;
      this.searchRecipe([]);
    });
  }

  autoComplete() {
    interface AutocompleateEntry {
      fullText: string;
    }
    this.api
      .getAutocompleteSugestions(this.searchName)
      .then(
        (res) =>
          (this.autoCompleteSugestions = (res as Array<AutocompleateEntry>).map(
            (element) => element.fullText
          ))
      )
      .catch((res) => console.log(res));
  }

  searchRecipe = async function (tags) {
    this.recepies = await this.api.getRecipeSearch(tags, this.searchName);
  };

  onTagsChanged = function (selectedTags) {
    this.selectedTags = selectedTags;
    this.searchRecipe(selectedTags);
  };

  onTextSearch = function () {
    this.searchRecipe(this.selectedTags);
  };

  async direcktlyOpen(name: string) {
    const recipeNumber = await this.api.getRecipeNumber(name);
    this.router.navigate(['/recipe/' + recipeNumber]);
  }
}
