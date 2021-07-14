import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  navbarClass ='navbar'
  themes = ['dark', 'solar', 'light']
  ngOnInit(): void {

  }

  getTheme(){
    const theme =  localStorage.getItem('theme');
    if (!theme){
      return 'navbar ' +this.themes[0];
    } else return 'navbar ' + theme
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

}
