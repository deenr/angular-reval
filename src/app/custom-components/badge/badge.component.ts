import {Component, Input} from '@angular/core';
import {BadgeSize} from './badge-size.enum';
import {BadgeType} from './badge-type.enum';
import {Color} from '@shared/enums/general/colors.enum';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() public color = Color.GREY;
  @Input() public size = BadgeSize.MD;
  @Input() public type = BadgeType.NONE;
  @Input() public icon: string;

  public badgeType = BadgeType;

  public getBadgeClasses(): string {
    return `badge ${this.color.toLowerCase().toLowerCase().replace('_', '-')} ${this.size.toLowerCase()} ${this.type !== BadgeType.NONE ? this.type.toLowerCase().replace('_', '-') : ''}`;
  }
}
