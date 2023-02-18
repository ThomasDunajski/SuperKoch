import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecepiePreviewListitemComponent } from './recepie-preview-listitem.component';

describe('RecepiePreviewListitemComponent', () => {
  let component: RecepiePreviewListitemComponent;
  let fixture: ComponentFixture<RecepiePreviewListitemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepiePreviewListitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiePreviewListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
