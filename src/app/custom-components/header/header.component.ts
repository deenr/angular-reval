import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tab} from '@custom-components/tabs/tab.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public title: string;
  @Input() public tabs: Tab[];
  @Input() public vertical = false;
  @Input() public needsConfirmation = false;
  @Output() public tabChange = new EventEmitter<Tab>();
}
