import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOverviewComponent } from './collection-overview.component';

describe('CollectionOverviewComponent', () => {
  let component: CollectionOverviewComponent;
  let fixture: ComponentFixture<CollectionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionOverviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
