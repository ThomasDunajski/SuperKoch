import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-season-viewer',
  templateUrl: './season-viewer.component.html',
  styleUrls: ['./season-viewer.component.css'],
})
export class SeasonViewerComponent implements OnInit {
  constructor() {}
  @Input() season;

  ngOnInit(): void {}

  months = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ];
  inSeason = (number) => (this.season.indexOf(number) === -1 ? false : true);
  cuurentlyInSeaseon = () =>
    this.inSeason(new Date().getMonth() + 1)
      ? 'gerade in Saison'
      : 'gerade nicht in Saison';
}
