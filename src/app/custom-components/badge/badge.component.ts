import {Component, Input} from '@angular/core';
import {BadgeColor} from './badge-color.enum';
import {BadgeSize} from './badge-size.enum';
import {BadgeType} from './badge-type.enum';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() public color = BadgeColor.GRAY;
  @Input() public size = BadgeSize.MD;
  @Input() public type = BadgeType.NONE;
  @Input() public icon: string;

  public badgeType = BadgeType;

  public getBadgeClasses(): string {
    return `badge ${this.color.toLowerCase()} ${this.size.toLowerCase()} ${this.type !== BadgeType.NONE ? this.type.toLowerCase().replace('_', '-') : ''}`;
  }
}
