import { Component } from '@angular/core';
import { OptionsService } from './services/options.service';
import { IOptions } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  options: IOptions;

  constructor(private optionsService: OptionsService) {
    this.optionsService.currentOptions.subscribe((options) =>
      this.applyTheme(options.theme)
    );
  }
  ngOnInit(): void {
    this.optionsService.currentOptions
      .toPromise()
      .then((options) => this.applyTheme(options.theme));
  }
  applyTheme(theme) {
    Object.keys(theme).forEach((key) =>
      document.documentElement.style.setProperty(key, theme[key])
    );
  }
}
