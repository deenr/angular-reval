import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
}
