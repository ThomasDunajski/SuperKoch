import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Recipe } from '../types';

@Component({
  selector: 'app-modal-paste-recipe',
  templateUrl: './modal-paste-recipe.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class ModalPasteRecipeComponent extends ModalComponent  {

  constructor() {
    super();
   }

   pasteInstructionString="";

  @Input() recipe :Recipe;
  ngOnInit(): void {
    super.ngOnInit();
    super.modalName = 'paste-recipe-modal';
    console.log(this.recipe)
  }
  showModal(){
    this.pasteInstructionString="";
    super.showModal();
  }
  pasteInstructions(){
    const newInstructions = this.pasteInstructionString.split("\n");
    this.recipe.instructions = this.recipe.instructions.concat(newInstructions).filter(x=>x!=="");
    this.hideModal();
  }
}
