import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
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
  previewClass;
  autoCompleteSugestions: string[] = [];

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.allTags=[];
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params)=>{
      this.previewClass = params.previewClass || 'img-only';
      this.searchName = params.searchName
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
  autoComplete(){
    interface AutocompleateEntry{
      fullText:string;
    }
    this.api.getAutocompleteSugestions(this.searchName)
    .then((res)=> this.autoCompleteSugestions = (res as Array<AutocompleateEntry>).map(element=> element.fullText))
    .catch((res)=>console.log(res))
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
    // TODO so ändern, dass änderung als parameter übergeben werden oder aufteilen in verschiedene funktionen
    let tagString = "";
    this.selected.map( x=> tagString += x.name +";");
    tagString = tagString.slice(0, -1);
    this.router.navigate([], 
      {
        relativeTo: this.activatedRoute,
        queryParams: {selectedTags:tagString, searchName:this.searchName, previewClass: this.previewClass}
        // queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  async direcktlyOpen(name:string){
    const recipeNumber = await this.api.getRecipeNumber(name);
    this.router.navigate(["/recipe/" + recipeNumber]);
  }
}