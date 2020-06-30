import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../recipe';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  constructor(private api: ApiService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getRecepie(this.actRoute.snapshot.params.id);
  }

  recepie:Recipe;
  error;
  
  getRecepie = async function(number){
      this.recepie = await this.api.getRecepie(number);
      // resolving imagename
      this.recepie.imageUri = this.api.getImageUri(this.recepie.imageUri);
  }
  
  getFormatedTime = function (time:number) {
    const minutes = time % 60 !== 0 ? time % 60 + " min" : "";
    const hours = time > 59 ? Math.floor(time / 60) + " Stunden " : ""
    return hours + minutes;
  }
  goToEdit(){
    this.router.navigate(["/recipe/edit/" + this.actRoute.snapshot.params.id]);
  }
  onTagClick(tag){
    this.router.navigate(["/"], {queryParams: {tag:tag.name}});
  }
}
