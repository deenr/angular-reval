import {Component} from '@angular/core';
import {UsersMetric} from '../users-metric.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent {
  public userMetrics: UsersMetric[] = [
    {
      title: 'Total users',
      amount: '2,420',
      differenceInPercentage: '20%',
      positive: true
    },
    {
      title: 'New users',
      amount: '350',
      differenceInPercentage: '10%',
      positive: true
    },
    {
      title: 'Monthly active users',
      amount: '800',
      differenceInPercentage: '-25%',
      positive: false
    }
  ];

  public isMobile: boolean;
  public isTablet: boolean;

  public constructor(private readonly breakpointService: BreakpointService) {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
      this.isTablet = this.breakpointService.isTablet;
    });
  }

  public getMetricOverviewHeight(): string {
    return this.isMobile || this.isTablet ? '100%' : `${(document.getElementsByTagName('app-metrics-card')[0] as HTMLElement)?.offsetHeight}px`;
  }
}
