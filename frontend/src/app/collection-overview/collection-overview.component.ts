import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-collection-overview',
  templateUrl: './collection-overview.component.html',
  styleUrls: ['./collection-overview.component.css']
})
export class CollectionOverviewComponent implements OnInit {

  constructor(private api:ApiService) { }
  collections = [];
  ngOnInit(): void {
    this.getCollections();  
  }
  getCollections = async function(){
    this.collections = await this.api.getCollections();  
  }

}
