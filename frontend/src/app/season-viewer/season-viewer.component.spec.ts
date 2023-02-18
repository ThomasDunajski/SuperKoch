import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeasonViewerComponent } from './season-viewer.component';

describe('SeasonViewerComponent', () => {
  let component: SeasonViewerComponent;
  let fixture: ComponentFixture<SeasonViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
