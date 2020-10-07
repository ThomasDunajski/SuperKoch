import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';

interface Section{
  name:string;
  recipes:any[];
  resolvedRecipes:any[];
}
interface Collection{
  name:string;
  text:string;
  sections:Section[];
}

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  constructor(private api: ApiService) { }


  collection:Collection = {name:"", text:"", sections:[{name:"", recipes:[1,2,3], resolvedRecipes:[]},]}
  recipeMock = {name:"mock", imageUri:"api/images/1597757341445.xdbZA.jpg"}
  animal;
  name;
  ngOnInit(): void {
    this.resolveRecipes();
  }
  addRecipe = (i)=> {
    this.collection.sections[i].resolvedRecipes.push(this.recipeMock);
  }
  removeRecipe = (i,j)=> {
    this.collection.sections[i].resolvedRecipes.splice(j,1);
  }
  addSection = ()=> {
    this.collection.sections.push({name:"", recipes:[], resolvedRecipes:[]})
  }
  removeSection = (i)=> {
    this.collection.sections.splice(i,1);
  }
  resolveRecipes = async ()=>{
    this.collection.sections.forEach( async (section: any) => {
      section.resolvedRecipes = await this.api.getRecepies(section.recipes);
    });
  }
 }
