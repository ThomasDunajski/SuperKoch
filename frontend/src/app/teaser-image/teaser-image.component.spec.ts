import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaserImageComponent } from './teaser-image.component';

describe('TeaserImageComponent', () => {
  let component: TeaserImageComponent;
  let fixture: ComponentFixture<TeaserImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeaserImageComponent ]
    })
    .compileComponents();
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
