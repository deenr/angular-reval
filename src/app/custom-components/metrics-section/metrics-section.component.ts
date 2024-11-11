import { Component, Input } from '@angular/core';
import { Metric } from './metric.interface';

@Component({
  selector: 'app-metrics-section',
  templateUrl: './metrics-section.component.html',
  styleUrls: ['./metrics-section.component.scss']
})
export class MetricsSectionComponent {
  @Input() public metrics: Metric[];
}
