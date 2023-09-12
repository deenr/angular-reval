import {FocusMonitor} from '@angular/cdk/a11y';
import {DatePipe} from '@angular/common';
import {Component, ElementRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatMenuTrigger} from '@angular/material/menu';
import {AbstractMatFormField} from '@helper/abstract-form-field-control';
import {DateRange} from '../date-range.interface';
import {MatDialog} from '@angular/material/dialog';
import {DatepickerMenuComponent} from '../datepicker-menu/datepicker-menu.component';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: DatepickerInputComponent
    }
  ]
})
export class DatepickerInputComponent extends AbstractMatFormField<Date | DateRange> implements OnInit {
  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;
  @ViewChild(MatInput, {static: false}) private input: MatInput;
  @Input() public dateRange = true;

  public isTablet: boolean;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    _focusMonitor: FocusMonitor,
    _elementRef: ElementRef,
    private readonly datePipe: DatePipe,
    private readonly dialog: MatDialog,
    private readonly breakpointService: BreakpointService
  ) {
    super('app-custom-text-input-with-icon', ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, _focusMonitor, _elementRef);
  }

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isTablet = this.breakpointService.isTablet;
    });
  }

  public onMenuClose(closeValue: Date | DateRange): void {
    if (!this.isTablet) {
      this.value = closeValue;
      this.trigger.closeMenu();
    }
  }

  public focus(): void {
    if (!this.isTablet) {
      this.input.focus();
      this.trigger.openMenu();
    }
  }

  public getPlaceholder(): string {
    return this.dateRange ? 'Select dates' : 'Select date';
  }

  public getDisplayValue(): string {
    if (this.dateRange) {
      const dateRange = this.value as DateRange;
      return dateRange ? `${this.datePipe.transform(dateRange.startDate.toString())} - ${this.datePipe.transform(dateRange.endDate.toString())}` : '';
    }
    return this.datePipe.transform(this.value?.toString());
  }

  public clear(): void {
    this.value = null;
  }

  public openDatepickerDialog(): void {
    if (this.isTablet) {
      this.dialog
        .open(DatepickerMenuComponent, {
          maxWidth: 'calc(100vw - 32px)',
          hasBackdrop: true,
          data: {
            actions: true
          }
        })
        .afterClosed()
        .subscribe((value: Date | DateRange) => {
          if ((value && (value as Date) instanceof Date) || (Object.keys(value).length > 1 && Object.keys(value).every((key: string) => (value as any)[key]))) {
            this.value = value;
          }
        });
    }
  }
}
