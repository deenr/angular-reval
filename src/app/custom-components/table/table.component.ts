import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BadgeSize } from '@custom-components/badge/badge-size.enum';
import { DateRange } from '@custom-components/datepicker/date-range.interface';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { Color } from '@shared/enums/general/colors.enum';
import { FilterProperty, FilterType } from './builder/filter-builder';
import { TableColumn } from './builder/table-column';
import { TableDataType } from './table-data-type.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }]
})
export class TableComponent<T> implements OnInit, OnChanges {
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  @Input() public data: T[];
  @Input() public columns: TableColumn[];

  MAX_SAFE_INTEGER = 9007199254740991;
  public displayedColumns: string[];
  public filters: FilterProperty[];
  public dataSource: MatTableDataSource<T>;
  public loadingData = true;

  public tableDataType = TableDataType;
  public badgeSize = BadgeSize;
  public skeletonType = SkeletonType;

  public constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.setDataSource();
    this.setColumns();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.setDataSource();
    }

    if (changes['columns'] && !changes['columns'].firstChange) {
      this.setColumns();
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortData = this.sortData;
  }

  public getAvatarName(field: string, data: any): string {
    const nameKey = this.columns.find((column: TableColumn) => column.field === field).avatarNameKey;

    const name = Array.isArray(nameKey) ? nameKey.map((key: string) => data[key]).join(' ') : data[nameKey];
    if (name === ' ' || name === '' || name === null || name === undefined) {
      return Array.isArray(nameKey) ? nameKey.map((key: string) => data?.[field]?.[key]).join(' ') : data[field][nameKey];
    }

    return name;
  }

  public getAvatarEmail(field: string, data: any): string {
    const avatarEmailKey = this.columns.find((column: TableColumn) => column.field === field).avatarEmailKey;

    const email = data[avatarEmailKey];

    return email === ' ' || email === '' || email === null || email === undefined ? data[field][avatarEmailKey] : email;
  }

  public getBadgeTranslationKey(field: string, value: any): string {
    const translationKey = this.columns.find((column: TableColumn) => column.field === field).translationKey;

    return `${translationKey}.${value}`;
  }

  public getBadgeSize(field: string): BadgeSize {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.size;
  }

  public getBadgeColor(field: string, value: any): Color {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.colors.get(value) ?? Color.GREY;
  }

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }

  public delete(id: string): void {
    this.columns.find((column: TableColumn) => column.type === TableDataType.DELETE).onDelete(id);
  }

  public edit(id: string): void {
    this.router.navigateByUrl(this.columns.find((column: TableColumn) => column.type === TableDataType.EDIT).editRoute.replace(':id', `${id}`));
  }

  public onFilterChange(filterValues: any): void {
    this.dataSource.filter = filterValues;
  }

  private getDataForSkeleton(): T[] {
    return [...Array(10).keys()].map((index: number) => ({ id: index } as T));
  }

  private setDataSource(): void {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      this.setFilterPredicate();
      this.loadingData = false;
    } else {
      this.loadingData = true;
      this.dataSource = new MatTableDataSource(this.getDataForSkeleton());
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setColumns(): void {
    this.displayedColumns = this.columns?.map((column: TableColumn) => column.field);

    this.filters = this.columns?.filter((value: TableColumn) => value.filterProperties).map((value: TableColumn) => value.filterProperties);
    this.setFilterPredicate();
  }

  private getFilterTypeByField(field: string): FilterType {
    return this.filters.find((filterProperty: FilterProperty) => filterProperty.field === field).type;
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (data, filter): boolean => {
      return this.filters.every((filterProperty: FilterProperty) => {
        switch (this.getFilterTypeByField(filterProperty.field)) {
          case FilterType.ENUM:
            if ((filter as any)[filterProperty.field]?.length) {
              for (const filterValue of (filter as any)[filterProperty.field]) {
                const dataValue = (data as any)[filterProperty.field];

                if (Array.isArray(dataValue)) {
                  for (const data of dataValue) {
                    if (data.trim() === filterValue) {
                      return true;
                    }
                  }
                } else if (dataValue.trim() === filterValue) {
                  return true;
                }
              }
              return false;
            }
            return true;

          case FilterType.DATE:
            const filterDates = (filter as any)[filterProperty.field] as DateRange;
            const date = (data as any)[filterProperty.field];
            return filterDates ? date >= filterDates.startDate && date <= filterDates.endDate : true;
          case FilterType.TEXT:
            if (filterProperty.fields) {
              return (
                `${(data as any)[filterProperty.fields[0]]} ${(data as any)[filterProperty.fields[1]]}`
                  ?.toString()
                  .trim()
                  .toLowerCase()
                  .indexOf((filter as any)[filterProperty.field].toLowerCase()) !== -1
              );
            }
            return (
              (data as any)[filterProperty.field]
                ?.toString()
                .trim()
                .toLowerCase()
                .indexOf((filter as any)[filterProperty.field].toLowerCase()) !== -1
            );
          default:
            return true;
        }
      });
    };
  }

  private sortingDataAccessor: (data: T, sortHeaderId: string) => string | number = (data: T, sortHeaderId: string): string | number => {
    const value = (data as unknown as Record<string, any>)[sortHeaderId];

    const combinedValue = this.filters
      .find((filterProperty: FilterProperty) => filterProperty.field === sortHeaderId)
      .fields.map((key: string) => (data as unknown as Record<string, any>)[key])
      .join(' ');

    if (_isNumberValue(value)) {
      const numberValue = Number(value);

      return numberValue < this.MAX_SAFE_INTEGER ? numberValue : value;
    } else if (!value && combinedValue) {
      return combinedValue;
    }

    return value;
  };

  private sortData: (data: T[], sort: MatSort) => T[] = (data: T[], sort: MatSort): T[] => {
    const active = sort.active;
    const direction = sort.direction;

    if (!active || direction === '') {
      return data;
    }

    return data.slice().sort((a, b) => {
      const valueA = this.sortingDataAccessor(a, active);
      const valueB = this.sortingDataAccessor(b, active);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * (direction === 'asc' ? 1 : -1);
      } else {
        return valueA?.toString()?.localeCompare(valueB?.toString(), undefined, { sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1);
      }
    });
  };
}

function getPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, amountOfItems: number) => `Page ${page + 1} of ${Math.ceil(amountOfItems / pageSize)}`;
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  return paginatorIntl;
}
