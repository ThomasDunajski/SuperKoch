import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface Section {
  name: string;
  recipes: any[];
}
interface Collection {
  name: string;
  number?: number;
  imageUrl?: string;
  text: string;
  sections: Section[];
}

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css'],
})
export class EditCollectionComponent implements OnInit {
  constructor(
    private api: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  collection: Collection = {
    name: '',
    text: '',
    imageUrl: '',
    sections: [{ name: '', recipes: [] }],
  };
  sectionSelectedForAdd;
  allRecipes;
  ngOnInit(): void {
    this.loadCollection();
  }
  loadCollection = async function () {
    console.log(this.actRoute.snapshot.params.id);
    if (this.actRoute.snapshot.params.id) {
      this.collection = (await this.api.getCollection(
        this.actRoute.snapshot.params.id
      )) as Collection;
      this.collection.sections.map((section) => (section.recipeNumbers = []));
    }
    this.allRecipes = await this.api.getAllRecipeTeaserData();
  };
  addRecipe = (i) => {
    document.getElementById('myModal').style.display = 'block';
    this.sectionSelectedForAdd = i;
  };
  recipeSelectedEvent(recipeNumber) {
    this.collection.sections[this.sectionSelectedForAdd].recipes.push(
      this.allRecipes[recipeNumber - 1]
    );
    this.hideModal();
  }
  removeRecipe = (i, j) => {
    this.collection.sections[i].recipes.splice(j, 1);
  };
  addSection = () => {
    this.collection.sections.push({ name: '', recipes: [] });
  };
  removeSection = (i) => {
    this.collection.sections.splice(i, 1);
  };
  resolveRecipes = async () => {
    this.collection.sections.forEach(async (section: any) => {
      section.resolvedRecipes = await this.api.getRecepies(section.recipes);
    });
  };
  saveCollection = () => {
    let collection = this.collection;
    if (collection.sections.some((section) => section.recipes.length === 0)) {
      alert('Kategorien müssen midenstens ein Rezept enthalten.');
      return;
    }
    collection.sections.forEach((section) => {
      let temp = [];
      section.recipes.map((recipe) => temp.push(recipe.number));
      section.recipes = temp;
    });
    console.log(collection);
    this.api
      .saveCollection(collection)
      .then((res: Response) => this.router.navigate([res.url]))
      .catch((err) => console.log(err));
  };
  hideModal = function () {
    document.getElementById('myModal').style.display = 'none';
  };
  interceptModalClose = (event) => {
    event.stopPropagation();
  };
  eventUplad: Subject<void> = new Subject<void>();
  showUploadModal() {
    this.eventUplad.next();
  }
  setImgePath(url) {
    this.collection.imageUrl = url;
  }
}
