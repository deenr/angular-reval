import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {TableDataType} from './table-data-type.enum';
import {TableColumn} from './builder/table-column';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {Router} from '@angular/router';
import {Color} from '@shared/enums/general/colors.enum';
import {FilterProperty, FilterType} from './builder/filter-builder';
import {DateRange} from '@custom-components/datepicker/date-range.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useValue: getPaginatorIntl()}]
})
export class TableComponent<T> implements OnInit, OnChanges {
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  @Input() public data: T[];
  @Input() public columns: TableColumn[];

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
  }

  public getAvatarName(field: string, data: any): string {
    const nameKey = this.columns.find((column: TableColumn) => column.field === field).avatarNameKey;

    return Array.isArray(nameKey) ? nameKey.map((key: string) => data[key]).join(' ') : data[nameKey];
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
    console.log(this.data);
    this.router.navigateByUrl(this.columns.find((column: TableColumn) => column.type === TableDataType.EDIT).editRoute.replace(':id', `${id}`));
  }

  public onFilterChange(filterValues: any): void {
    this.dataSource.filter = filterValues;
  }

  private getDataForSkeleton(): T[] {
    return [...Array(10).keys()].map((index: number) => ({id: index} as T));
  }

  private setDataSource(): void {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
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

    this.dataSource.filterPredicate = (data, filter): boolean => {
      return this.filters.every((filterProperty: FilterProperty) => {
        console.log(filterProperty.field, (data as any)[filterProperty.field], this.getFilterTypeByField(filterProperty.field));
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

  private getFilterTypeByField(field: string): FilterType {
    return this.filters.find((filterProperty: FilterProperty) => filterProperty.field === field).type;
  }
}

function getPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, amountOfItems: number) => `Page ${page + 1} of ${Math.ceil(amountOfItems / pageSize)}`;
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  return paginatorIntl;
}
