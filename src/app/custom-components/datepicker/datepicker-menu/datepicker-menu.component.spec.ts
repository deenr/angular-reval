import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DatepickerMenuComponent} from './datepicker-menu.component';

describe('DatepickerInputComponent', () => {
  let component: DatepickerMenuComponent;
  let fixture: ComponentFixture<DatepickerMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerMenuComponent]
    });
    fixture = TestBed.createComponent(DatepickerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
