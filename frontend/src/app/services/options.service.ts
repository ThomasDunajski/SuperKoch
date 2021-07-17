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

  constructor() { }

  changeOptions(options: IOptions) {
    this.messageSource.next(options)
  }
}