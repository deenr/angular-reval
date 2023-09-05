import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterProperties, FilterType} from '@custom-components/table/builder/filter-builder';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() public filters: FilterProperties[];
  @Output() public onSearchFilter = new EventEmitter<string>();

  public get searchFilter(): FilterProperties {
    return this.filters.find((filter: FilterProperties) => filter.type === FilterType.TEXT);
  }

  public applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value.trim();
    filterValue = filterValue.toLowerCase();
    this.onSearchFilter.emit(filterValue);
  }
}
