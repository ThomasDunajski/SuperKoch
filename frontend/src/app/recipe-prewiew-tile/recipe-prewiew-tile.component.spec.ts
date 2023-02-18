import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipePrewiewTileComponent } from './recipe-prewiew-tile.component';

describe('PrewiewTileComponent', () => {
  let component: RecipePrewiewTileComponent;
  let fixture: ComponentFixture<RecipePrewiewTileComponent>;

  beforeEach(waitForAsync(() => {
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
