import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
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
  largeImages = false;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.allTags=[];
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params)=>{
      this.searchName = params.searchName
      if (params.largeImages == 1) this.largeImages = true;
      if (this.allTags && this.allTags.length > 0){
        this.selected = [];
      }
      else{
        await this.getAllTags( this.activatedRoute.snapshot.queryParamMap.get("selectedTags"));
      }
      this.processSelectedTags(params.selectedTags);
      this.getRecipeSearch();
    })
  }

  onTagClick(event, tag) {
    this.selectTag(tag);
  }

  selectTag(tag){
    if (!this.selected.includes(tag)){
      this.selected.push(tag);
      this.tagCategorys = this.tagCategorys.map(category=> 
        category.filter(element => element.name !== tag.name));
      this.updateSearchParams();
    }
  }
  remove(tag: Tag): void {
    const index = this.selected.indexOf(tag);
    if (index >= 0) {
      this.selected.splice(index, 1);
      this.tagCategorys = this.tagCategorys.map(category =>
        (category[0].category.name === tag.category.name) ? category.concat(tag) : category );
      this.updateSearchParams();
    }
  }

  getAllTags = async function(selectedTagsString?:string) {
    this.allTags = await this.api.getAllTags();
    this.processTags();
    this.processSelectedTags(selectedTagsString)
  }

  processSelectedTags(selectedTagsString){
    if (selectedTagsString){
      let selectedTagNames = selectedTagsString.split(";");
      selectedTagNames.forEach((tagName)=>
        this.selectTag(this.allTags.find(x => x.name === tagName)));
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
  updateSearchParams(){
    let tagString = "";
    this.selected.map( x=> tagString += x.name +";");
    tagString = tagString.slice(0, -1);
    this.router.navigate([], 
      {
        relativeTo: this.activatedRoute,
        queryParams: {selectedTags:tagString, searchName:this.searchName, largeImages: this.largeImages ? 1 : 0}
        // queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
  onScroll = async function()  {
    if (!this.isLoading){
      this.isLoading = true;
      var newRecipes = await this.api.getRecipeSearch(this.selected, this.searchName, this.recepies.length, 10);
      this.recepies = this.recepies.concat(newRecipes);
      this.isLoading = false;
    }
  }
}