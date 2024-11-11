import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleBadgesComponent} from './multiple-badges.component';

describe('MultipleBadgesComponent', () => {
  let component: MultipleBadgesComponent;
  let fixture: ComponentFixture<MultipleBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleBadgesComponent]
    });
    fixture = TestBed.createComponent(MultipleBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
