import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeaserImageComponent } from './teaser-image.component';

describe('TeaserImageComponent', () => {
  let component: TeaserImageComponent;
  let fixture: ComponentFixture<TeaserImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TeaserImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
