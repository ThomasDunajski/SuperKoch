import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recepie-preview-listitem',
  templateUrl: './recepie-preview-listitem.component.html',
  styleUrls: ['./recepie-preview-listitem.component.css'],
})
export class RecepiePreviewListitemComponent implements OnInit {
  constructor(public api: ApiService) {}

  @Input() data;
  @Input() previewStyle;
  ngOnInit(): void {}
}
