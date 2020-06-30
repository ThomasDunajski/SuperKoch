import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl} from '@angular/forms';
import {map, startWith, take } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router'

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
  allTagNames: string[] = [];
  searchName:string = "";

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.allTags=[];
  }

  ngOnInit(): void {
    
    this.searchName = this.route.snapshot.queryParamMap.get("searchName")
    if (this.searchName && this.searchName.length > 0){
      this.getRecipeSearch();
    }
    const tag = this.route.snapshot.queryParamMap.get("tag");
    if (tag){
      console.log(tag);
      this.getAllTags(tag);
    }
    else{
      this.getAllTags();
    }    
    this.getRecomandedTags();
  }

  onTagClick(event, tag) {
    console.log(tag.name +' clicked')
    this.selectTag(tag);
  }

  selectTag(tag){
    this.selected.push(tag);
    this.getRecomandedTags();
    //this.allTags = this.allTags.filter( el => el.name.valueOf() !== tag.name.valueOf()); 
    this.allTagNames = this.allTagNames.filter( el => el.valueOf() !== tag.name.valueOf()); 
    this.getRecipeSearch();
  }

  remove(tag: Tag): void {
    const index = this.selected.indexOf(tag);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
    this.getRecomandedTags();
    this.allTags.push(tag);
    this.allTagNames.push(tag.name)
    this.getRecipeSearch();
  }

  autocompleteSelected(event){
    //console.log('autocomplete ' + tag.name +' clicked')
    this.selectTag({name:event.option.viewValue});
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    //this.selectTag(tag);
  }

  getRecomandedTags = async function() {
        this.recomandedTags = await this.api.getRecomandedTags(this.selected);
  }
  getAllTags = async function(SearchTagString?:string) {
    this.allTags = await this.api.getAllTags(this.selected);
    this.allTags.push({_id: null, name:"in Saison"});
    this.allTags.forEach(element => {
      this.allTagNames.push(element.name)
    });
    if (SearchTagString){
      const taggSearchResult = this.allTags.find(x => x.name === SearchTagString);
      if (taggSearchResult){
        this.selectTag(taggSearchResult);
      }
    }
    var filter = function(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.allTagNames.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
    }
    this.tagsForAutocomplete = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? filter(tag) : this.allTagNames.slice()));          
  }
  
  getRecipeSearch = async function() {
    this.recepies = await this.api.getRecipeSearch(this.selected, this.searchName);
  }
  nameChanged(name:string){
    this.searchName = name;
    this.getRecipeSearch();
  }
}

