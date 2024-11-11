import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterfaceComponent} from './interface.component';

describe('InterfaceComponent', () => {
  let component: InterfaceComponent;
  let fixture: ComponentFixture<InterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceComponent]
    });
    fixture = TestBed.createComponent(InterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
