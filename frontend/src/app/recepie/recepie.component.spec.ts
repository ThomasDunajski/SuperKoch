import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecepieComponent } from './recepie.component';

describe('RecepieComponent', () => {
  let component: RecepieComponent;
  let fixture: ComponentFixture<RecepieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecepieComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
