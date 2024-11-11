import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StackedLeftDialogComponent} from './stacked-left-dialog.component';

describe('StackedLeftDialogComponent', () => {
  let component: StackedLeftDialogComponent;
  let fixture: ComponentFixture<StackedLeftDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedLeftDialogComponent]
    });
    fixture = TestBed.createComponent(StackedLeftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
