import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CountUpDirective } from '@shared/directives/count-up/count-up.directive';
import { Metric } from './metric.interface';

@Component({
  standalone: true,
  selector: 'app-metrics-section',
  templateUrl: './metrics-section.component.html',
  styleUrls: ['./metrics-section.component.scss'],
  imports: [CommonModule, CountUpDirective]
})
export class MetricsSectionComponent {
  @Input() public metrics: Metric[];
}
