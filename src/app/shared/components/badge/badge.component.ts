import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Color } from '@shared/enums/general/colors.enum';
import { BadgeSize } from './badge-size.enum';
import { BadgeType } from './badge-type.enum';

@Component({
  standalone: true,
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  imports: [CommonModule, MatIconModule]
})
export class BadgeComponent {
  @Input() public color = Color.GREY;
  @Input() public size = BadgeSize.MD;
  @Input() public type = BadgeType.NONE;
  @Input() public icon: string;
  @Output() public leadingClick = new EventEmitter<void>();
  @Output() public trailingClick = new EventEmitter<void>();
  @Output() public closeClick = new EventEmitter<void>();

  public badgeType = BadgeType;

  public constructor(public elementRef: ElementRef) {}

  public getBadgeClasses(): string {
    return `badge ${this.color.toLowerCase().toLowerCase().replace('_', '-')} ${this.size.toLowerCase()} ${this.type !== BadgeType.NONE ? this.type.toLowerCase().replace('_', '-') : ''}`;
  }
}
