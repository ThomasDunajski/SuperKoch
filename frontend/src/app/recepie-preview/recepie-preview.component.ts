import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepie-preview',
  templateUrl: './recepie-preview.component.html',
  styleUrls: ['./recepie-preview.component.css'],
})
export class RecepiePreviewComponent implements OnInit {
  constructor(public api: ApiService) {}

  @Input() data;
  @Input() previewStyle;
  ngOnInit(): void {
    console.log(this.previewStyle);
  }
  test = () => true;
}
