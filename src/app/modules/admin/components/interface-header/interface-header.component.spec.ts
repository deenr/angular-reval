import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceHeaderComponent } from './interface-header.component';

describe('InterfaceHeaderComponent', () => {
  let component: InterfaceHeaderComponent;
  let fixture: ComponentFixture<InterfaceHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceHeaderComponent]
    });
    fixture = TestBed.createComponent(InterfaceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
