import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterfaceSidebarComponent} from './interface-sidebar.component';

describe('InterfaceSidebarComponent', () => {
  let component: InterfaceSidebarComponent;
  let fixture: ComponentFixture<InterfaceSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceSidebarComponent]
    });
    fixture = TestBed.createComponent(InterfaceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
