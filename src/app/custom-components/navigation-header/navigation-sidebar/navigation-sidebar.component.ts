import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss']
})
export class NavigationSidebarComponent {
  @Output() public sidenavClose = new EventEmitter();
}
