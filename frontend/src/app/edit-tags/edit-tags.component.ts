import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TagContentType } from '@angular/compiler';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.css']
})
export class EditTagsComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }
  tag = {name:"", clickCount: 0, category: {number: 0, name:"not_Set"}}
  categories = [{number:10, name:"Tageszeit"},{number:20, name:"Hauptzutat"},{number:30, name:"Eigenschaften"},
                {number:40, name:"Spezielle Diät"},{number:50, name:"Art der Mahlzeit"},{number:60, name:"Herkunft"}]

  addTag = function(){
    this.api.addTag(this.tag)
    .then(res => this.tag = {name:"", clickCount: 0, category: {number: 0, name:"not_Set"}})
    .catch(err => console.log(err));
  }
}
