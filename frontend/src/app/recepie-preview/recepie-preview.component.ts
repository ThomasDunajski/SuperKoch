import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recepie-preview',
  templateUrl: './recepie-preview.component.html',
  styleUrls: ['./recepie-preview.component.css']
})
export class RecepiePreviewComponent implements OnInit {

  constructor() { }

  @Input() data;

  ngOnInit(): void {
  }
}
