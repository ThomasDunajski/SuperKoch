import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  constructor(private api: ApiService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRecepie(this.actRoute.snapshot.params.id);
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
