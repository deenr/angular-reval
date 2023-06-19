import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() public link: string;
  @Input() public icon: string;
  @Input() public title: string;
  @Input() public text: string;
}
