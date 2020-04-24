import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecepieComponent } from './add-recepie.component';

describe('AddRecepieComponent', () => {
  let component: AddRecepieComponent;
  let fixture: ComponentFixture<AddRecepieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecepieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecepieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
