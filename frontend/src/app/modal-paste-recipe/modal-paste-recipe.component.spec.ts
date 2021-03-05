import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPasteRecipeComponent } from './modal-paste-recipe.component';

describe('ModalPasteRecipeComponent', () => {
  let component: ModalPasteRecipeComponent;
  let fixture: ComponentFixture<ModalPasteRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPasteRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPasteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
