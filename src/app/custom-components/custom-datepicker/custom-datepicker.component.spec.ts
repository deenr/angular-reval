import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatepickerComponent } from './custom-datepicker.component';

describe('DatepickerComponent', () => {
  let component: CustomDatepickerComponent;
  let fixture: ComponentFixture<CustomDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDatepickerComponent],
    });
    fixture = TestBed.createComponent(CustomDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
