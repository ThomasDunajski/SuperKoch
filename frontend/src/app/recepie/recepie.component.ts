import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.css']
})
export class RecepieComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getRecepie(1);
  }

  recepie;
  error;
  
  getRecepie(number){
    this.api.getRecepie(number).subscribe(data => {
      this.recepie = data;
    },
    (error => {
      this.error = error;      
    }))
  }
}
