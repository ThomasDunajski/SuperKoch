import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recepie-preview',
  templateUrl: './recepie-preview.component.html',
  styleUrls: ['./recepie-preview.component.css']
})
export class RecepiePreviewComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  @Input() data;
  @Input() imageOnly;
  ngOnInit(): void {
    // resolving imagename to url if its a uploaded file
    if (this.data.imageUri.indexOf("/") === -1)
    this.data.imageUri = this.api.getImageUri(this.data.imageUri);
  }
  getThumbnailName(path){
    if (path.includes(".jpg")){
     return path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg";
    }
    return path.substr(0, path.lastIndexOf(".png")) + "_thumb.jpg";
  }
}
