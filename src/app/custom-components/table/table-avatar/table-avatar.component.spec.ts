import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableAvatarComponent} from './table-avatar.component';

describe('TableAvatarComponent', () => {
  let component: TableAvatarComponent;
  let fixture: ComponentFixture<TableAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAvatarComponent]
    });
    fixture = TestBed.createComponent(TableAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
