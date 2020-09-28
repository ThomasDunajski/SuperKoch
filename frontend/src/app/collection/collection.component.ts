import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private api:ApiService) { }
  teaser;
  ngOnInit(): void {
    this.getCollection(1);
  }
  collection;

  getCollection = async function(number){
    this.collection = await this.api.getCollection(number);
    this.teaser = {
      imageUrl:this.collection.imageUrl,
      heading:this.collection.name,
      text:this.collection.text
    }
  }

}
