import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePrewiewTileComponent } from './recipe-prewiew-tile.component';

describe('PrewiewTileComponent', () => {
  let component: RecipePrewiewTileComponent;
  let fixture: ComponentFixture<RecipePrewiewTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePrewiewTileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePrewiewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
