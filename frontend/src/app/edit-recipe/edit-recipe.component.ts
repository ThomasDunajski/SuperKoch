import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Recipe, Ingredient, Heading } from '../types';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  isSesonal: boolean;
  units = [
    'g',
    'ml',
    'TL',
    'EL',
    'Stück',
    'Prise',
    'Schuss',
    'etwas',
    'Dose',
    'Bund',
    'Packung',
  ];
  selectedTags = [];
  progress: number = 0;
  initialySelectedTags = [];

  constructor(
    public api: ApiService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRecipe();
  }
  async loadRecipe() {
    if (this.actRoute.snapshot.params.id) {
      this.recipe = (await this.api.getRecepie(
        this.actRoute.snapshot.params.id
      )) as Recipe;
      this.recipe.ingredients.map((x) => (x.quantity *= this.recipe.servings));
      this.initialySelectedTags = this.recipe.tags;
      this.selectedTags = this.recipe.tags;
    }
  }
  addIngredient() {
    this.recipe.ingredients.push(new Ingredient());
  }
  addHeading(position: number) {
    if (!this.recipe.headings) {
      this.recipe.headings = [];
    }
    if (!this.getHeading(position)) {
      this.recipe.headings.push(new Heading(position));
    }
  }
  getHeading(position: number) {
    return this.recipe.headings
      ? this.recipe.headings.filter((x) => x.position === position)[0]
      : null;
  }
  removeHeading(position: number) {
    var index = this.recipe.headings.indexOf(this.getHeading(position));
    this.recipe.headings.splice(index, 1);
  }
  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }
  addInstruction() {
    this.recipe.instructions.push('');
  }
  removeInctruction(index: number) {
    this.recipe.instructions.splice(index, 1);
  }
  onCheckboxChange(isChecked: boolean) {
    this.isSesonal = isChecked;
  }
  onSesonChanged(value: string[]) {
    this.recipe.season = value.map(Number);
  }
  saveRecipe() {
    if (!this.recipe.name || !this.recipe.servings) {
      alert(
        'Ein Rezept braucht einen Namen und die Anzahl der Portionen um gespeichert werden zu können'
      );
      return;
    }
    if (this.selectedTags.length < 1) {
      alert(
        'Ein Rezept braucht mindestens einen Tag um gespeichert werden zu können'
      );
      return;
    }
    this.recipe.instructions = this.recipe.instructions.filter((x) => x !== '');
    this.recipe.ingredients.forEach(
      (x) => (x.quantity = x.quantity / this.recipe.servings)
    );
    this.recipe.tags = this.selectedTags.map((x) => x._id);
    this.api
      .addRecipe(this.recipe)
      .then((res: Response) => this.router.navigate([res.url]))
      .catch((err) => {
        console.log(err);
        this.recipe.ingredients.forEach(
          (x) => (x.quantity = x.quantity * this.recipe.servings)
        );
      });
  }

  deleteImage(image, index) {
    if (confirm('Sind Sie sicher, dass Sie das Bild löschen wollen?')) {
      console.log('call delete image: ' + image);
      this.api
        .deleteImage(image)
        .then(() => this.recipe.images.splice(index, 1))
        .catch((err) => console.log(err));
    } else {
      // Do nothing!
    }
  }

  eventUplad: Subject<void> = new Subject<void>();
  showUploadModal() {
    this.eventUplad.next();
  }

  getInstructionId(index: number, employee: any) {
    return index;
  }

  tagsCahnged(newTags) {
    this.selectedTags = newTags;
  }
  pasteIgredients() {
    navigator.clipboard?.readText().then((clipText) => {
      const lines = clipText.split('\n');
      lines.forEach((line) =>
        this.recipe.ingredients.push(new Ingredient(line))
      );
    });
  }
  pasteInstructions() {
    navigator.clipboard?.readText().then((clipText) => {
      const lines = clipText.split('\n');
      lines.forEach((line) => this.recipe.instructions.push(line));
    });
  }

  moveImage(direction: 'up' | 'down', index: number) {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex > this.recipe.images.length - 1) {
      throw new Error(
        `move image error: incorect index:${index} with direction:${direction}`
      );
    }
    const swap = this.recipe.images[index];
    this.recipe.images[index] = this.recipe.images[targetIndex];
    this.recipe.images[targetIndex] = swap;
  }
}
