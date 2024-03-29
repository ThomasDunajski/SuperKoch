import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Recipe, Ingredient } from '../types';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css'],
})
export class RecepieComponent implements OnInit {
  constructor(
    private api: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  @Input() recipeNumber: number;
  ngOnInit(): void {
    if (this.recipeNumber) this.getRecepie(this.recipeNumber);
    else this.getRecepie(this.actRoute.snapshot.params.id);
    this.getWakeLcok();
  }

  recepie: Recipe;
  error;

  images = [];

  getRecepie = async function (number: number) {
    this.recepie = await this.api.getRecepie(number);
    if (this.recepie.images) {
      for (let image of this.recepie.images) {
        this.images.push({ image: this.api.getImageUri(image) });
      }
      if (this.images.length === 0)
        this.images.push({ image: this.api.getImageUri() });
    }
  };

  getFormatedTime = function (time: number) {
    const minutes = time % 60 !== 0 ? (time % 60) + ' min' : '';
    const hours = time > 59 ? Math.floor(time / 60) + ' Stunden ' : '';
    if ((hours + minutes).length > 0) return hours + minutes;
    return '0';
  };
  goToEdit() {
    this.router.navigate(['/recipe/edit/' + this.actRoute.snapshot.params.id]);
  }

  async getWakeLcok() {
    //@ts-ignore
    const wakeLock = await navigator.wakeLock.request('screen');
  }
}
