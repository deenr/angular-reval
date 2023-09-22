import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DatepickerInputComponent} from './datepicker-input.component';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DatepickerModule} from '../datepicker.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatepickerMenuComponent} from '../datepicker-menu/datepicker-menu.component';
import {of} from 'rxjs';

function mockDialogRef<T, R>(component: T, result: R): MatDialogRef<any, R> {
  return {componentInstance: component, afterClosed: () => of<R>(result)} as MatDialogRef<T, R>;
}

describe('DatepickerInputComponent', () => {
  let component: DatepickerInputComponent;
  let fixture: ComponentFixture<DatepickerInputComponent>;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerInputComponent],
      imports: [DatepickerModule, BrowserAnimationsModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}}, {provide: MatDialogRef, useValue: {}}, DatePipe, MatDialog]
    });
    fixture = TestBed.createComponent(DatepickerInputComponent);
    component = fixture.componentInstance;

    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onMenuClose', () => {
    it('should set value and close the menu when not on mobile/tablet', () => {
      fixture.detectChanges();

      component.isMobile = false;
      component.isTablet = false;
      spyOn(component.trigger, 'closeMenu');
      const date = new Date();

      component.onMenuClose(date);

      expect(component.value).toEqual(date);
      expect(component.trigger.closeMenu).toHaveBeenCalled();
    });

    it('should not set value and close the menu on mobile/tablet', () => {
      fixture.detectChanges();

      component.isMobile = true;
      component.isTablet = true;
      spyOn(component.trigger, 'closeMenu');
      component.onMenuClose(new Date());

      expect(component.value).toBeUndefined();
    });
  });

  describe('getPlaceholder', () => {
    it('should return "Select dates" for dateRange true', () => {
      component.dateRange = true;
      const placeholder = component.getPlaceholder();

      expect(placeholder).toEqual('Select dates');
    });

    it('should return "Select date" for dateRange false', () => {
      component.dateRange = false;
      const placeholder = component.getPlaceholder();

      expect(placeholder).toEqual('Select date');
    });
  });

  describe('getDisplayValue', () => {
    it('should return a formatted date range for dateRange true', () => {
      component.dateRange = true;
      const date = 'Sep 20, 2023';

      const dateRange = {startDate: new Date(date), endDate: new Date(date)};
      component.value = dateRange;
      const displayValue = component.getDisplayValue();

      expect(displayValue).toEqual(`${date} - ${date}`);
    });

    it('should return a formatted date for dateRange false', () => {
      component.dateRange = false;
      const date = 'Sep 20, 2023';

      component.value = new Date(date);
      const displayValue = component.getDisplayValue();

      expect(displayValue).toEqual(date);
    });
  });

  describe('clear', () => {
    it('should  set value to null', () => {
      component.clear();

      expect(component.value).toBeNull();
    });
  });

  describe('isDatepickerMenuOpen', () => {
    it('should return true if the datepicker menu elements exist', () => {
      const mockElement = {} as Element;
      const mockHTMLCollection = [mockElement] as unknown as HTMLCollectionOf<Element>;

      spyOn(document, 'getElementsByClassName').and.returnValue(mockHTMLCollection);
      spyOn(document, 'getElementsByTagName').and.returnValue(mockHTMLCollection);

      const isOpen = component.isDatepickerMenuOpen();

      expect(isOpen).toBeTrue();
    });

    it('should return false if the datepicker menu elements do not exist', () => {
      spyOn(document, 'getElementsByClassName').and.returnValue(null);
      spyOn(document, 'getElementsByTagName').and.returnValue(null);

      const isOpen = component.isDatepickerMenuOpen();

      expect(isOpen).toBeFalse();
    });
  });

  describe('openDatepickerDialog', () => {
    it('should not open the datepicker dialog for desktop', () => {
      component.isMobile = false;
      component.isTablet = false;

      spyOn(dialog, 'open');
      component.openDatepickerDialog();

      expect(dialog.open).not.toHaveBeenCalled();
    });

    it('should open the datepicker dialog for mobile or tablet', () => {
      component.isMobile = true;
      component.isTablet = true;
      component.dateRange = false;

      const value = new Date();

      spyOn(dialog, 'open').and.returnValue(mockDialogRef(component, value));

      component.openDatepickerDialog();

      expect(dialog.open).toHaveBeenCalledWith(DatepickerMenuComponent, {
        width: 'calc(100vw - 32px)',
        maxWidth: 'calc(100vw - 32px)',
        hasBackdrop: true,
        data: {
          dateRange: false,
          actions: true
        }
      });

      expect(component.value).toEqual(value);
    });
  });
});
