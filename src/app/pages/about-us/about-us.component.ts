import {Component} from '@angular/core';
import {Metric} from '@custom-components/metrics-section/metric.interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  public stats = [
    {value: '+2k', text: 'Active users'},
    {value: '14 days', text: 'Average lending duration'},
    {value: '10k', text: 'Documents uploaded'}
  ] as Metric[];
}
