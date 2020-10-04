import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  constructor() { }
  collection = {name:"", text:"", sections:[{name:"", recipes:[1,2,3]}]}
  recipeMock = {name:"mock", imageUri:"api/images/1597757341445.xdbZA.jpg"}
  ngOnInit(): void {
  }

}
