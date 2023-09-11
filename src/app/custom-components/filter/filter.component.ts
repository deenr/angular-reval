import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {FilterDialogComponent} from '@custom-components/dialogs/filter-dialog/filter-dialog.component';
import {FilterProperty, FilterType} from '@custom-components/table/builder/filter-builder';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() public filters: FilterProperty[];
  @Output() public filterChange = new EventEmitter<any>();

  public filterType = FilterType;
  public filterForm = new FormGroup({});

  public get otherFilters(): FilterProperty[] {
    return this.filters.filter((filter: FilterProperty) => filter.type !== FilterType.TEXT);
  }

  public constructor(private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.filters.forEach((filter: FilterProperty) => {
      this.filterForm.addControl(filter.field, new FormControl(filter.type === FilterType.TEXT ? '' : null));
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.filterChange.emit(this.filterForm.value);

      console.log(this.filterForm.value);
    });
  }

  public getEnumTranslationKey(field: string, value: any): string {
    const translationKey = this.filters.find((filter: FilterProperty) => filter.field === field).translationKey;

    return `${translationKey}.${value}`;
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
        console.log(this.filterForm.value);
      });
  }
}
