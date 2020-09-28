import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.css']
})
export class CollectionPreviewComponent implements OnInit {

  constructor() { }

  @Input() data;
  ngOnInit(): void {
    this.data.head = this.data.name;
  }

}
