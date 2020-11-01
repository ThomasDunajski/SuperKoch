import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private api:ApiService,  private actRoute: ActivatedRoute) { }
  teaser;
  ngOnInit(): void {
    this.getCollection(this.actRoute.snapshot.params.id);
  }
  collection;

  getCollection = async function(number){
    this.collection = await this.api.getCollection(number);
    this.teaser = {
      imageUrl:this.collection.imageUrl,
      head:this.collection.name,
      text:this.collection.text
    }
  }

}
