import { Component, OnInit } from '@angular/core';
import { DatepickerDate } from './datepicker-date.interface';
@Component({
  selector: 'app-custom-datepicker',
  templateUrl: 'custom-datepicker.component.html',
  styleUrls: ['custom-datepicker.component.scss'],
})
export class CustomDatepickerComponent implements OnInit {
  currentDateInView: DatepickerDate | null;
  selectedStartDate: DatepickerDate | null;
  selectedEndDate: DatepickerDate | null;
  showPicker = false;
  currentMonth: string;
  calendarDates: DatepickerDate[] = [];
  weekdays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  public ngOnInit(): void {
    const today = new Date();
    this.currentDateInView = {
      date: today,
      selected: false,
    };
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.currentMonth = this.getMonthYearString(this.currentDateInView.date);
    this.generateCalendarDates(this.currentDateInView.date);
  }

  public openPicker(): void {
    this.showPicker = true;
  }

  public goToPreviousMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.date.setFullYear(
        this.currentDateInView.date.getMonth() === 1
          ? this.currentDateInView.date.getFullYear() - 1
          : this.currentDateInView.date.getFullYear()
      );
      this.currentDateInView.date.setMonth(
        this.currentDateInView.date.getMonth() === 1
          ? 12
          : this.currentDateInView.date.getMonth() - 1
      );
      console.log(this.currentDateInView.date);
      this.currentMonth = this.getMonthYearString(this.currentDateInView.date);
      this.generateCalendarDates(this.currentDateInView.date);
    }
  }

  public goToNextMonth(): void {
    if (this.currentDateInView) {
      this.currentDateInView.date.setFullYear(
        this.currentDateInView.date.getMonth() === 12
          ? this.currentDateInView.date.getFullYear() + 1
          : this.currentDateInView.date.getFullYear()
      );
      this.currentDateInView.date.setMonth(
        this.currentDateInView.date.getMonth() === 12
          ? 1
          : this.currentDateInView.date.getMonth() + 1
      );
      console.log(this.currentDateInView.date);
      this.currentMonth = this.getMonthYearString(this.currentDateInView.date);
      this.generateCalendarDates(this.currentDateInView.date);
    }
  }

  public selectDate(date: DatepickerDate): void {
    if (!this.selectedStartDate) {
      this.selectedStartDate = date;
      date.selected = true;
    } else if (!this.selectedEndDate) {
      this.selectedEndDate = date;
      date.selected = true;
    } else if (this.selectedStartDate && this.selectedEndDate) {
      this.selectedStartDate.selected = false;
      this.selectedEndDate.selected = false;
      this.selectedStartDate = date;
      date.selected = true;
      this.selectedEndDate = null;
    }
  }

  public isDateInRange(givenDate: DatepickerDate): boolean {
    if (this.selectedStartDate?.date && this.selectedEndDate?.date) {
      return (
        givenDate.date.getTime() > this.selectedStartDate?.date.getTime() &&
        givenDate.date.getTime() <= this.selectedEndDate?.date.getTime()
      );
    }
    return false;
  }

  public isDateInRangeAndSaturday(givenDate: DatepickerDate): boolean {
    return (
      this.isDateInRange(givenDate) &&
      givenDate.date.getDay() === 6 &&
      givenDate.date.getHours() > 12
    );
  }

  public isDateInRangeAndSunday(givenDate: DatepickerDate): boolean {
    return (
      this.isDateInRange(givenDate) &&
      givenDate.date.getDay() === 0 &&
      givenDate.date.getHours() < 12
    );
  }

  public isDateInCurrentMonth(date: DatepickerDate): boolean {
    return date.date.getMonth() === this.currentDateInView?.date.getMonth();
  }

  public getRangeDates(): DatepickerDate[] {
    const rangeDates: DatepickerDate[] = [];
    this.calendarDates.forEach((customDate: DatepickerDate) => {
      const morningDate = new Date(customDate.date);
      morningDate.setHours(0, 0, 0, 0);
      rangeDates.push({ date: morningDate, selected: false });

      const nightDate = new Date(customDate.date);
      nightDate.setHours(23, 59, 59, 999);

      rangeDates.push({ date: nightDate, selected: false });
    });

    return rangeDates;
  }

  private getMonthYearString(date: Date): string {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  private generateCalendarDates(date: Date): void {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      firstDayOfMonth.getDate()
    );
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(
      lastDayOfMonth.getFullYear(),
      lastDayOfMonth.getMonth(),
      lastDayOfMonth.getDate()
    );
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    console.log(startDate, endDate);

    this.calendarDates = [];
    let currentDate = new Date(startDate);
    while (currentDate.getTime() <= endDate.getTime()) {
      this.calendarDates.push({
        date: new Date(currentDate),
        selected: false,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  private isDateBefore(date1: DatepickerDate, date2: DatepickerDate): boolean {
    return date1.date.getTime() < date2.date.getTime();
  }

  private isDateAfter(date1: DatepickerDate, date2: DatepickerDate): boolean {
    return date1.date.getTime() > date2.date.getTime();
  }
}
