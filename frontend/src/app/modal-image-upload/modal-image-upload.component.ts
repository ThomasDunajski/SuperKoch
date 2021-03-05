import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-image-upload',
  templateUrl: './modal-image-upload.component.html',
  styleUrls: ['../modal/modal.component.css']
})
export class ModalImageUploadComponent  extends ModalComponent  {

  constructor() {
    super();
   }

  ngOnInit(): void {
    super.ngOnInit();
    super.modalName = 'uploadModal';
  }

}
