import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagSelectionComponent } from './tag-selection.component';

describe('TagSelectionComponent', () => {
  let component: TagSelectionComponent;
  let fixture: ComponentFixture<TagSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TagSelectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
