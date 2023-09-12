import {DatePipe} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BadgeType} from '@custom-components/badge/badge-type.enum';
import {FilterDialogComponent} from '@custom-components/dialogs/filter-dialog/filter-dialog.component';
import {FilterProperty, FilterType} from '@custom-components/table/builder/filter-builder';
import {TranslatePipe} from '@shared/pipes/translate/translate.pipe';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() public filters: FilterProperty[];
  @Output() public filterChange = new EventEmitter<any>();

  public badgeType = BadgeType;
  public filterType = FilterType;
  public filterForm = new FormGroup({});
  public isTablet: boolean;

  public get otherFilters(): FilterProperty[] {
    return this.filters.filter((filter: FilterProperty) => filter.type !== FilterType.TEXT);
  }

  public constructor(private readonly dialog: MatDialog, private readonly translate: TranslatePipe, private readonly datePipe: DatePipe, private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isTablet = this.breakpointService.isTablet;
    });

    this.filters.forEach((filter: FilterProperty) => {
      this.filterForm.addControl(filter.field, new FormControl(filter.type === FilterType.TEXT ? '' : null));
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.filterChange.emit(this.filterForm.value);
    });
  }

  public getEnumTranslationKey(field: string, value: any): string {
    const translationKey = this.filters.find((filter: FilterProperty) => filter.field === field).translationKey;

    return `${translationKey}.${value}`;
  }

  public getFilterChips(): {field: string; type: FilterType; value: string}[] {
    return this.filters
      .filter((filter: FilterProperty) => filter.type !== FilterType.TEXT && (this.filterForm.value as any)[filter.field])
      .map((filter: FilterProperty) => {
        if (filter.type === FilterType.ENUM) {
          const enumValues = (this.filterForm.value as any)[filter.field];
          return {
            field: filter.field,
            type: filter.type,
            value: `${this.translate.transform(`${filter.translationKey}.${enumValues[0]}`)}${enumValues.length > 1 ? `, +${enumValues.length - 1}` : ''}`
          };
        } else {
          const value = `${this.datePipe.transform((this.filterForm.value as any)[filter.field].startDate.toString())} - ${this.datePipe.transform(
            (this.filterForm.value as any)[filter.field].endDate.toString()
          )}`;
          return {field: filter.field, type: filter.type, value};
        }
      });
  }

  public openFilterDialog(): void {
    this.dialog
      .open(FilterDialogComponent, {
        width: 'calc(100vw - 32px)',
        maxWidth: 'calc(100vw - 32px)',
        data: {
          filters: this.otherFilters,
          filterFormValues: this.filterForm.value
        }
      })
      .afterClosed()
      .subscribe((filterValues: any) => {
        if (filterValues) {
          Object.keys(filterValues).forEach((filterName: string) => ((this.filterForm.controls as any)[filterName] as FormControl).setValue(filterValues[filterName]));
        }
      });
  }
  public removeFilter(field: string): void {
    (this.filterForm.controls as any)[field].setValue(null);
  }
}
