import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiePreviewListitemComponent } from './recepie-preview-listitem.component';

describe('RecepiePreviewListitemComponent', () => {
  let component: RecepiePreviewListitemComponent;
  let fixture: ComponentFixture<RecepiePreviewListitemComponent>;

  beforeEach(async(() => {
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
