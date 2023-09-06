import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FilterProperty, FilterType} from '@custom-components/table/builder/filter-builder';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  public filters: FilterProperty[];
  public filterFormValues: any;

  public filterForm = new FormGroup({});
  public filterType = FilterType;

  public constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: {
      filters: FilterProperty[];
      filterFormValues: any;
    }
  ) {
    this.filters = data.filters;
    this.filterFormValues = data.filterFormValues;
  }

  public ngOnInit(): void {
    this.filters.forEach((filter: FilterProperty) => {
      this.filterForm.addControl(filter.field, new FormControl(this.filterFormValues[filter.field]));
    });
  }

  public getEnumTranslationKey(field: string, value: any): string {
    const translationKey = this.filters.find((filter: FilterProperty) => filter.field === field).translationKey;

    return `${translationKey}.${value}`;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.dialogRef.close(this.filterForm.value);
  }
}
