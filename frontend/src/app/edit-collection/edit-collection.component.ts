import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  constructor() { }

  collection = {name:"", text:"", sections:[{name:"", recipes:[1,2,3]}]}
  recipeMock = {name:"mock", imageUri:"api/images/1597757341445.xdbZA.jpg"}
  animal;
  name;
  ngOnInit(): void {
  }
  addRecipe = (i)=> {
    this.collection.sections[i].recipes.push(1);
  }
  removeRecipe = (i,j)=> {
    this.collection.sections[i].recipes.splice(j,1);
  }
  addSection = ()=> {
    this.collection.sections.push({name:"", recipes:[]})
  }
  removeSection = (i)=> {
    this.collection.sections.splice(i,1);
  }
 }
