import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recepie-preview',
  templateUrl: './recepie-preview.component.html',
  styleUrls: ['./recepie-preview.component.css']
})
export class RecepiePreviewComponent implements OnInit {

  constructor(private api: ApiService) { }

  @Input() data;
  url;
  ngOnInit(): void {
    this.url = "/recipe/" + this.data.number
    // resolving imagename to url if its a uploaded file
    if (this.data.imageUri.indexOf("/") === -1)
    this.data.imageUri = this.api.getImageUri(this.data.imageUri);
  }
}
