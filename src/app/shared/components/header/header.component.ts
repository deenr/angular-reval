import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from '@shared/components/tabs/tab.interface';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [TabsComponent]
})
export class HeaderComponent {
  @Input() public title: string;
  @Input() public tabs: Tab[];
  @Input() public vertical = false;
  @Input() public needsConfirmation = false;
  @Output() public tabChange = new EventEmitter<Tab>();
}
