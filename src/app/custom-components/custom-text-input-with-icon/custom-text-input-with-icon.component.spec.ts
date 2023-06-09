import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomTextInputWithIconComponent} from './custom-text-input-with-icon.component';

describe('CustomTextInputWithIconComponent', () => {
  let component: CustomTextInputWithIconComponent;
  let fixture: ComponentFixture<CustomTextInputWithIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTextInputWithIconComponent]
    });
    fixture = TestBed.createComponent(CustomTextInputWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
