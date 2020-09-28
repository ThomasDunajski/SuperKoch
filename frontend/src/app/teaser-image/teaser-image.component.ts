import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teaser-image',
  templateUrl: './teaser-image.component.html',
  styleUrls: ['./teaser-image.component.css']
})
export class TeaserImageComponent implements OnInit {

  constructor() { }
  @Input() data:Teaser;
  ngOnInit(): void {
  }

}
class Teaser{
  imageUrl:string;
  head:string;
  text:string;
}