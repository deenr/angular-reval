import {Component, Input} from '@angular/core';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';
import {BadgeType} from '@custom-components/badge/badge-type.enum';

@Component({
  selector: 'app-metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent {
  @Input() public title: string;
  @Input() public metric: string;
  @Input() public badgeTitle: string;
  @Input() public negative = false;

  public badgeType = BadgeType;
  public badgeColor = BadgeColor;
}
