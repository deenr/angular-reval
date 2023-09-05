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
import {FilterProperties} from './builder/filter-builder';

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
  public filters: FilterProperties[];
  public dataSource: MatTableDataSource<T>;
  public loadingData = true;

  public tableDataType = TableDataType;
  public badgeSize = BadgeSize;
  public skeletonType = SkeletonType;

  public constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.setColumns();
    this.setDataSource();
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

  public getBadgeTranslationKey(field: string, value: any): string {
    const translationKey = this.columns.find((column: TableColumn) => column.field === field).badgeProperties.translationKey;
    return `${translationKey}.${value}`;
  }

  public getBadgeSize(field: string): BadgeSize {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.size;
  }

  public getBadgeColor(field: string, value: any): Color {
    return this.columns.find((column: TableColumn) => column.field === field).badgeProperties.colors.get(value);
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

  public searchFilter(filterValue: string): void {
    this.applyFilter(filterValue);
  }

  private applyFilter(filterValue: string): void {
    this.dataSource.filterPredicate = (data, filter) => (data as any)['name'].toString().toLowerCase().includes(filterValue.toLowerCase());

    this.dataSource.filter = filterValue;
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

    this.filters = this.columns.filter((value: TableColumn) => value.filterProperties).map((value: TableColumn) => value.filterProperties);
  }
}

function getPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.getRangeLabel = (page: number, pageSize: number, amountOfItems: number) => `Page ${page + 1} of ${Math.ceil(amountOfItems / pageSize)}`;
  paginatorIntl.nextPageLabel = 'Next Page';
  paginatorIntl.previousPageLabel = 'Previous Page';
  return paginatorIntl;
}
