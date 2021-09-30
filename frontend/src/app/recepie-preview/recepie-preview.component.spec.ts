import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiePreviewComponent } from './recepie-preview.component';

describe('RecepiePreviewComponent', () => {
  let component: RecepiePreviewComponent;
  let fixture: ComponentFixture<RecepiePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecepiePreviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
