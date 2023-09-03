import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() public onSearchFilter = new EventEmitter<string>();

  public applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value.trim();
    filterValue = filterValue.toLowerCase();
    this.onSearchFilter.emit(filterValue);
  }
}
