import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOptions } from '../types'

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private messageSource = new BehaviorSubject<IOptions>(
    {
      theme:
        {
          '--item-primary': '#b6b6b6',
          '--item-secondary': '#ececec',
          '--text-primary': '#b6b6b6',
          '--text-secondary': '#ececec',
          '--bg-primary': '#23232e',
          '--bg-secondary': '#141418',
        }
    });
  currentOptions = this.messageSource.asObservable();

  constructor() { 
    const storedOptions = localStorage.getItem('options');
    console.log(storedOptions)
    if (storedOptions){
      this.changeOptions(JSON.parse(storedOptions))
    }
  }

  changeOptions(options: IOptions) {
    this.messageSource.next(options)
    localStorage.setItem('options', JSON.stringify(options))
  }
}