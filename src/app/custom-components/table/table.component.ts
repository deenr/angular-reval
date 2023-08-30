import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {TableDataType} from './table-data-type.enum';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';
import {TableColumn} from './builder/table-column';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';

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
  public dataSource: MatTableDataSource<T>;
  public loadingData = true;

  public tableDataType = TableDataType;
  public badgeSize = BadgeSize;
  public skeletonType = SkeletonType;

  public ngOnInit(): void {
    this.displayedColumns = this.columns?.map((column: TableColumn) => column.field);
    this.setDataSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.setDataSource();
    }

    if (changes['columns'] && !changes['columns'].firstChange) {
      this.displayedColumns = this.columns?.map((column: TableColumn) => column.field);
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getBadgeTranslationKey(field: string, value: any): string {
    const translationKey = this.columns.find((column: TableColumn) => column.field === field).badgeProperties.translationKey;
    return `${translationKey}.${value}`;
  }

  public getBadgeSize(field: string): BadgeSize {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.size;
  }

  public getBadgeColor(field: string, value: any): BadgeColor {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.colors.get(value);
  }

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
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
}

function getPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, amountOfItems: number) => `Page ${page + 1} of ${Math.ceil(amountOfItems / pageSize)}`;
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  return paginatorIntl;
}
