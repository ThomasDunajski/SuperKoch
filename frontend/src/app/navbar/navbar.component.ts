import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private optionsService: OptionsService) { }
  index=0;
  themes = [
    {
      '--item-primary': '#b6b6b6',
      '--item-secondary': '#ececec',
      '--text-primary': '#b6b6b6',
      '--text-secondary': '#ececec',
      '--bg-primary': '#23232e',
      '--bg-secondary': '#141418',
    }, 
    {
      '--item-primary': '#5D6DA8',
      '--item-secondary': '#35535c',
      '--text-primary': '#576e75',
      '--text-secondary': '#35535c',
      '--bg-primary': '#fdf6e3',
      '--bg-secondary': '#f5e5b8',
    }, 
    {
      '--item-primary': '#3DACF2',
      '--item-secondary': '#000000',
      '--text-primary': '#1f1f1f',
      '--text-secondary': '#000000',
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#e4e4e4',
    }, 
  ]
  ngOnInit(): void {

  }

  changeTheme(){
    this.optionsService.changeOptions({theme:this.themes[this.index]});
    this.index++; 
    if (this.index > 2) this.index = 0;
  }

}
