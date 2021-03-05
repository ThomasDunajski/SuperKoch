import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageUploadComponent } from './modal-image-upload.component';

describe('ModalImageUploadComponent', () => {
  let component: ModalImageUploadComponent;
  let fixture: ComponentFixture<ModalImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
