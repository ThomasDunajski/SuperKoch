import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe }from '../recipe';

@Component({
  selector: 'app-add-recepie',
  templateUrl: './add-recepie.component.html',
  styleUrls: ['./add-recepie.component.css']
})
export class AddRecepieComponent implements OnInit {

  recipe:Recipe = new Recipe();
  constructor() { }
  ngOnInit(): void {
  }

}
