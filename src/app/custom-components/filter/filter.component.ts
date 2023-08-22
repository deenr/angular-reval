import {Component} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value.trim();
    filterValue = filterValue.toLowerCase();
  }
}
