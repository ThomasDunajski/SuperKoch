import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalImageUploadComponent } from './modal-image-upload.component';

describe('ModalImageUploadComponent', () => {
  let component: ModalImageUploadComponent;
  let fixture: ComponentFixture<ModalImageUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalImageUploadComponent],
    }).compileComponents();
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
