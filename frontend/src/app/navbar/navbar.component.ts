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
      name:'light',
      '--item-primary': '#b6b6b6',
      '--item-secondary': '#ececec',
      '--text-primary': '#b6b6b6',
      '--bg-primary': '#23232e',
      '--bg-secondary': '#141418',
    }, 
    {
      name:'dark',
      '--item-primary': '#5D6DA8',
      '--item-secondary': '#35535c',
      '--text-primary': '#576e75',
      '--bg-primary': '#fdf6e3',
      '--bg-secondary': '#f5e5b8',
    }, 
    {
      name:'yellow',
      '--item-primary': '#3DACF2',
      '--item-secondary': '#000000',
      '--text-primary': '#1f1f1f',
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#e4e4e4',
    }, 
    {
      name:'purple',
      '--item-primary': '#6B3863',
      '--item-secondary': '#B0CAD2',
      '--text-primary': '#000000',
      '--bg-primary': '#F7E4F9',
      '--bg-secondary': '#A193B5',
      // light FCEEFC bg
    }, 
  ]

  changeTheme(){
    this.optionsService.changeOptions({theme:this.themes[this.index]});
    this.index++; 
    if (this.index > 3) this.index = 0;
  }

}
