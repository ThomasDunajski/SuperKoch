import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe , Ingredient}from '../types';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  constructor(private api: ApiService, private actRoute: ActivatedRoute, private router: Router) { }

  @Input() recipeNumber:number;
  ngOnInit(): void {
    if (this.recipeNumber)
      this.getRecepie(this.recipeNumber);
    else
      this.getRecepie(this.actRoute.snapshot.params.id);
  }

  recepie:Recipe;
  error;
  
  getRecepie = async function(number:number){
      this.recepie = await this.api.getRecepie(number);
  }
  
  getFormatedTime = function (time:number) {
    const minutes = time % 60 !== 0 ? time % 60 + " min" : "";
    const hours = time > 59 ? Math.floor(time / 60) + " Stunden " : ""
    if ((hours + minutes).length > 0)
      return hours + minutes;
    return "0";
  }
  goToEdit(){
    this.router.navigate(["/recipe/edit/" + this.actRoute.snapshot.params.id]);
  }
  getImageName(path){
    if (path.includes(".jpg")){
     return path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg";
    }
    return path.substr(0, path.lastIndexOf(".png")) + "_large.jpg";
  }
}
