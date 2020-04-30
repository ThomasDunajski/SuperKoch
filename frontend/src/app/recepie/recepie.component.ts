import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';


@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getRecepie("2");
  }

  recepie:Recipe;
  error;
  
  getRecepie(number){
    this.api.getRecepie(number).subscribe(data => {
      this.recepie = data as Recipe;
      // resolving imagename to url if its a uploaded file
      if (this.recepie.imageUri.indexOf("/") === -1)
      this.recepie.imageUri = this.api.getImageUri(this.recepie.imageUri);
    },
    (error => {
      this.error = error;      
    }))
  }
}
