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
  }
}
