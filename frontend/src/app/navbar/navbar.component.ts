import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private optionsService: OptionsService) { }

  navbarClass ='navbar'
  themes = ['dark', 'solar', 'light']
  ngOnInit(): void {

  }

  getTheme(){
    const theme =  localStorage.getItem('theme');
    if (!theme){
      return 'navbar ' +this.themes[0];
    } else return 'navbar '// + theme
  } 
  togleTheme(){
    const theme =  localStorage.getItem('theme');
    if (!theme){
      localStorage.setItem('theme', 'dark')
    } else{
      if (theme === 'dark')
        localStorage.setItem('theme', 'solar')
      if (theme === 'solar')
        localStorage.setItem('theme', 'light')
      if (theme === 'light')
        localStorage.setItem('theme', 'dark')
    }
  }
  changeTheme(){
    this.optionsService.changeOptions({theme:
      {
        '--item-primary': '#576e75',
        '--item-secondary': '#35535c',
        '--text-primary': '#576e75',
        '--text-secondary': '#35535c',
        '--bg-primary': '#fdf6e3',
        '--bg-secondary': '#f5e5b8',
        // --text-primary: #576e75;
        // --text-secondary: #35535c;
        // --bg-primary: #fdf6e3;
        // --bg-secondary: #f5e5b8;
      }
    })
  }

}
