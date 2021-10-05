import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipe-prewiew-tile',
  templateUrl: './recipe-prewiew-tile.component.html',
  styleUrls: ['./recipe-prewiew-tile.component.css'],
})
export class RecipePrewiewTileComponent implements OnInit {
  @Input() data;

  constructor(public api: ApiService) {}

  ngOnInit(): void {}
}
