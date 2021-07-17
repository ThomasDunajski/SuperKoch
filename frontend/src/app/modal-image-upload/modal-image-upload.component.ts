import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal-image-upload',
  templateUrl: './modal-image-upload.component.html',
  styleUrls: ['../modal/modal.component.css', "./modal-image-upload.component.css" ]
})
export class ModalImageUploadComponent  extends ModalComponent  {

  constructor(public api: ApiService) {
    super();
   }
  @Input() images;
  @Output() imageUrlChanged: EventEmitter<string> = new EventEmitter();
  @Input() aspectRatio = 4/4;
  canvasRotation = 0;
  ngOnInit(): void {
    super.ngOnInit();
    super.modalName = 'uploadModal';
  }

  hideModal(){
    (<HTMLInputElement>document.getElementById('fileDropRef')).value = '';
    this.imageChangedEvent='';
    super.hideModal();
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  uploadImage() {
    var blob = this.dataURItoBlob(this.croppedImage);
    var file = new File([blob], "fileName.jpeg", {
      type: "image/jpeg"
    });
    this.api.uploadImage(
      file
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          // this.progress = Math.round(event.loaded / event.total * 100);
          // console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Image successfully uploaded', event.body);
          const resBody = JSON.parse(JSON.stringify(event.body));
          if (resBody.filename ===""){
            // this.progress = 0;
          }
          else{
            if (Array.isArray(this.images)){
              this.images.push(resBody.filename);
            }
            else if(typeof this.images === 'string'){
              this.imageUrlChanged.emit(resBody.filename);
            }
            this.hideModal();
          }
      }
    })
  }
  
  dataURItoBlob(dataURI) {

    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

}
