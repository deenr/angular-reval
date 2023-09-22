import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeComponent} from './badge.component';
import {Color} from '@shared/enums/general/colors.enum';
import {BadgeSize} from './badge-size.enum';
import {BadgeType} from './badge-type.enum';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent]
    });
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getBadgeClasses', () => {
    it('should return badge classes with default values', () => {
      const classes = component.getBadgeClasses();
      expect(classes).toBe('badge grey md ');
    });

    it('should handle BadgeType.NONE', () => {
      component.type = BadgeType.NONE;
      const classes = component.getBadgeClasses();
      expect(classes).toBe('badge grey md ');
    });

    it('should return badge classes with custom color, size, and type', () => {
      component.color = Color.BLUE;
      component.size = BadgeSize.LG;
      component.type = BadgeType.CLOSE;
      const classes = component.getBadgeClasses();
      expect(classes).toBe('badge blue lg close');
    });

    it('should handle underscores in color and type', () => {
      component.color = Color.BLUE_DARK;
      component.type = BadgeType.LEADING_ICON;
      const classes = component.getBadgeClasses();
      expect(classes).toBe('badge blue-dark md leading-icon');
    });
  });
});
