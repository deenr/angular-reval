import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateRange} from '../date-range.interface';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-datepicker-menu',
  templateUrl: 'datepicker-menu.component.html',
  styleUrls: ['datepicker-menu.component.scss']
})
export class DatepickerMenuComponent implements OnInit {
  @Input() public dateRange = true;
  @Input() public actions = false;
  @Output() public closeMenu = new EventEmitter<Date | DateRange>();

  public currentDateInView: Date;

  public selectedSingleDate: Date;
  public selectedStartDate: Date;
  public selectedEndDate: Date;

  public calendarDates: Date[] = [];
  public currentMonth: string;
  public weekdays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  public dateForm = new FormGroup({
    selectedSingleDate: new FormControl<Date>(null),
    selectedStartDate: new FormControl<Date>(null),
    selectedEndDate: new FormControl<Date>(null)
  });

  public constructor(
    public dialogRef: MatDialogRef<DatepickerMenuComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      dateRange: boolean;
      actions: boolean;
    }
  ) {
    this.dateRange = data.dateRange;
    this.actions = data.actions;
  }

  public ngOnInit(): void {
    this.changeToToday();
  }

  public changeToToday(): void {
    const today = new Date();
    this.currentDateInView = today;
    this.currentMonth = this.getMonthYearString(this.currentDateInView);
    this.generateCalendarDates(this.currentDateInView);
  }

  public goToPreviousMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.setFullYear(this.currentDateInView.getMonth() === 1 ? this.currentDateInView.getFullYear() - 1 : this.currentDateInView.getFullYear());
      this.currentDateInView.setMonth(this.currentDateInView.getMonth() === 1 ? 12 : this.currentDateInView.getMonth() - 1);
      this.currentMonth = this.getMonthYearString(this.currentDateInView);
      this.generateCalendarDates(this.currentDateInView);
    }
  }

  public goToNextMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.setFullYear(this.currentDateInView.getMonth() === 12 ? this.currentDateInView.getFullYear() + 1 : this.currentDateInView.getFullYear());
      this.currentDateInView.setMonth(this.currentDateInView.getMonth() === 12 ? 1 : this.currentDateInView.getMonth() + 1);
      this.currentMonth = this.getMonthYearString(this.currentDateInView);
      this.generateCalendarDates(this.currentDateInView);
    }
  }

  public selectDate(date: Date): void {
    if (this.dateRange) {
      if (!this.selectedStartDate) {
        this.selectedStartDate = date;
      } else if (!this.selectedEndDate) {
        if (this.isDateBefore(date, this.selectedStartDate)) {
          this.selectedEndDate = this.selectedStartDate;
          this.selectedStartDate = date;
        } else {
          this.selectedEndDate = date;
        }
        this.closeMenu.emit({startDate: this.selectedStartDate, endDate: this.selectedEndDate});
      } else if (this.selectedStartDate && this.selectedEndDate) {
        this.selectedStartDate = date;
        this.selectedEndDate = null;
      }
      this.dateForm.controls.selectedStartDate.setValue(this.selectedStartDate);
      this.dateForm.controls.selectedEndDate.setValue(this.selectedEndDate);
    } else {
      this.selectedSingleDate = date;
      this.dateForm.controls.selectedSingleDate.setValue(this.selectedSingleDate);
      this.closeMenu.emit(this.selectedSingleDate);
    }
  }

  public isDateToday(date: Date): boolean {
    const today = new Date();

    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear() && date.getDate() === today.getDate();
  }

  public isDateInRange(date: Date): boolean {
    if (this.selectedStartDate && this.selectedEndDate) {
      return date.getTime() > this.selectedStartDate?.getTime() && date.getTime() <= this.selectedEndDate?.getTime();
    }
    return false;
  }

  public isDateInRangeAndSaturday(date: Date): boolean {
    return this.isDateInRange(date) && date.getDay() === 6 && date.getHours() > 12;
  }

  public isDateInRangeAndSunday(date: Date): boolean {
    return this.isDateInRange(date) && date.getDay() === 0 && date.getHours() < 12;
  }

  public isDateInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDateInView?.getMonth();
  }

  public getRangeDates(): Date[] {
    const rangeDates: Date[] = [];
    this.calendarDates.forEach((date: Date) => {
      const morningDate = new Date(date);
      morningDate.setHours(0, 0, 0, 0);
      rangeDates.push(morningDate);

      const nightDate = new Date(date);
      nightDate.setHours(23, 59, 59, 999);

      rangeDates.push(nightDate);
    });

    return rangeDates;
  }

  public isDateEqual(date1: Date, date2: Date): boolean {
    return date1?.getDate() === date2?.getDate() && date1?.getMonth() === date2?.getMonth() && date1?.getFullYear() === date2?.getFullYear();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    this.dialogRef.close(this.dateRange ? {startDate: this.selectedStartDate, endDate: this.selectedEndDate} : this.selectedSingleDate);
  }

  private getMonthYearString(date: Date): string {
    return date.toLocaleString('default', {month: 'long', year: 'numeric'});
  }

  private generateCalendarDates(date: Date): void {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate());
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    this.calendarDates = [];
    let currentDate = new Date(startDate);
    while (currentDate.getTime() <= endDate.getTime()) {
      this.calendarDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private isDateBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  private isDateAfter(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }
}
