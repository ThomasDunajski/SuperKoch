import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import {FormControl} from '@angular/forms';
import {map, startWith, take } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router'


export interface Tag {
  name: string;
  category:{
    name:string,
    number:number
  }
  _id: string;
}

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  selected:Tag[] = [];
  recepies = [];
  allTags:Tag[];
  searchName:string = "";
  isLoading = false;
  tagCategorys = [];
  imageOnlyView = false;

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
  }

  onTagClick(event, tag) {
    console.log(tag.name +' clicked')
    this.selectTag(tag);
  }

  selectTag(tag){
    this.selected.push(tag);
    this.getRecipeSearch();
    this.tagCategorys = this.tagCategorys.map(category=> 
      category.filter(element => element.name !== tag.name));
  }


  remove(tag: Tag): void {
    const index = this.selected.indexOf(tag);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
    this.getRecipeSearch();
    this.tagCategorys = this.tagCategorys.map(category =>
       (category[0].category.name === tag.category.name) ? category.concat(tag) : category );
  }

  getAllTags = async function(SearchTagString?:string) {
    this.allTags = await this.api.getAllTags();
    this.processTags();

    if (SearchTagString){
      const taggSearchResult = this.allTags.find(x => x.name === SearchTagString);
      if (taggSearchResult){
        this.selectTag(taggSearchResult);
      }
    } 
  }
  
  processTags(){
    var categorys = {};
    this.allTags.forEach(tag => {
      if (!categorys.hasOwnProperty(tag.category.number)) categorys[tag.category.number] = [];
      categorys[tag.category.number].push(tag);
    });
    this.tagCategorys = [];
    Object.keys(categorys).map( x=> this.tagCategorys.push(categorys[x]))
  }
  getRecipeSearch = async function() {
    this.recepies = await this.api.getRecipeSearch(this.selected, this.searchName);
  }
  nameChanged(name:string){
    this.searchName = name;
    this.getRecipeSearch();
  }
  onScroll = async function()  {
    if (!this.isLoading){
      this.isLoading = true;
      var newRecipes = await this.api.getRecipeSearch(this.selected, this.searchName, this.recepies.length, 5);
      this.recepies = this.recepies.concat(newRecipes);
      this.isLoading = false;
    }
  }
}