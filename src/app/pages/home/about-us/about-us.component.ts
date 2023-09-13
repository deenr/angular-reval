import {Component} from '@angular/core';
import {Metric} from '@custom-components/metrics-section/metric.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  public stats = [
    {value: 2000, text: 'Active users'},
    {value: 14, unit: ' days', text: 'Average lending duration'},
    {value: 12000, text: 'Documents uploaded'}
  ] as Metric[];
}
