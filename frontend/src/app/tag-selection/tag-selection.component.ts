import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.css'],
})
export class TagSelectionComponent implements OnInit {
  @Output() tagsChanged = new EventEmitter<string[]>();
  @Input() set setSelected(newSelected) {
    this.selected = newSelected;
  }

  selected = [];

  constructor(private api: ApiService) {}

  tagCategorys: any = [];

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.tagCategorys = await this.api.getAllTags();
  }

  onTagClick(tag): void {
    if (!this.selected.some((x) => x._id === tag._id)) {
      this.selected.push(tag);
    } else {
      this.selected = this.selected.filter(
        (selected) => selected._id !== tag._id
      );
    }
    this.tagsChanged.emit(this.selected);
  }
}
