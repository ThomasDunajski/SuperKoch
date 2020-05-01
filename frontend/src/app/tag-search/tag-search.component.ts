import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl} from '@angular/forms';
import {map, startWith, take } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Tag {
  name: string;
  _id: string;
}

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  filterTagsForAutocomplete
  recomandedTags:Tag[];
  selected:Tag[] = [];
  tagsForAutocomplete:Observable<string[]>;
  recepies = [];
  allTags:Tag[];
  tagCtrl = new FormControl();
  friut;
  allTagNames: string[] = [];

  constructor(private api: ApiService) {
    this.allTags=[];
  }

  ngOnInit(): void {
    this.getRecomandedTags();
    this.getAllTags();
  }

  onTagClick(event, tag) {
    console.log(tag.name +' clicked')
    this.selectTag(tag);
  }

  selectTag(tag){
    this.selected.push(tag);
    this.getRecomandedTags();
    this.allTags = this.allTags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
    this.allTagNames = this.allTagNames.filter( el => el.valueOf() !== tag.name.valueOf()); 
    console.log(this.tagsForAutocomplete);
    this.getRecepieTagSearch();

  }

  remove(tag: Tag): void {
    const index = this.selected.indexOf(tag);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
    this.getRecomandedTags();
    this.allTags.push(tag);
    this.allTagNames.push(tag.name)
    this.getRecepieTagSearch();
  }

  autocompleteSelected(event){
    //console.log('autocomplete ' + tag.name +' clicked')
    this.selectTag({name:event.option.viewValue});
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    //this.selectTag(tag);
  }

  getRecomandedTags = function() {
    this.api.getRecomandedTags(this.selected)
      .subscribe(data => {
        this.recomandedTags = data;
      },
      (error => {

      }
      ));
  }
  getAllTags = function() {
    this.api.getAllTags(this.selected)
      .subscribe(data => {
        this.allTags = data;
        this.allTags.push({_id: null, name:"in Saison"});
        this.allTags.forEach(element => {
          this.allTagNames.push(element.name)
        });
        this.tagsForAutocomplete = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((tag: string | null) => tag ? this._filter(tag) : this.allTagNames.slice()));
      },
      (error => {
        this.allTags = [];
      }
      ));
  }
getRecepieTagSearch = function() {
  this.api.getRecepieTagSearch(this.selected)
    .subscribe(data => {
      this.recepies = data;
    },
    (error => {
      this.recepies = [];
    }
    ));
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTagNames.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}

