import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {BadgeColor} from '@custom-components/badge/badge-color.enum';
import {BadgeType} from '@custom-components/badge/badge-type.enum';
import {MetricTimeFrame} from './metric-time-frame.enum';
import {FormControl} from '@angular/forms';
import {Subject, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-metrics-card',
  templateUrl: './metrics-card.component.html',
  styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit {
  @Input() public title: string;
  @Input() public metric: string;
  @Input() public comparisonValue: string;
  @Input() public negative = false;
  @Input() public showChart = false;
  @Input() public showBadge = false;
  @Input() public canChangeTimeFrame = true;

  public timeFrames = [MetricTimeFrame.LAST_DAY, MetricTimeFrame.LAST_WEEK, MetricTimeFrame.LAST_MONTH, MetricTimeFrame.LAST_QUARTER, MetricTimeFrame.LAST_YEAR];
  public timeFrameControl = new FormControl(MetricTimeFrame.LAST_DAY);

  public badgeType = BadgeType;
  public badgeColor = BadgeColor;

  public width = 200;
  public height = 70;
  public animateChart = true;

  private resizeWidthSubject = new Subject<number>();

  private timeFrameTranslation = new Map<MetricTimeFrame, string>([
    [MetricTimeFrame.LAST_DAY, 'Last day'],
    [MetricTimeFrame.LAST_WEEK, 'Last week'],
    [MetricTimeFrame.LAST_MONTH, 'Last month'],
    [MetricTimeFrame.LAST_QUARTER, 'Last quarter'],
    [MetricTimeFrame.LAST_YEAR, 'Last year']
  ]);

  public constructor(private readonly elementRef: ElementRef) {}

  public ngOnInit(): void {
    new ResizeObserver((entries) => {
      const metricsCard = entries[0].target;
      if (metricsCard) {
        const chart = metricsCard.getElementsByClassName('card__chart')[0] as HTMLElement;
        this.resizeWidthSubject.next(chart?.clientWidth);
      }
    }).observe(this.elementRef.nativeElement);

    this.resizeWidthSubject.pipe(distinctUntilChanged()).subscribe((width: number) => {
      this.width = width;
    });
  }

  public toggleAnimation(): void {
    this.animateChart = false;
    setTimeout(() => (this.animateChart = true));
  }

  public getTimeFrameTranslation(timeFrame: MetricTimeFrame): string {
    return this.timeFrameTranslation.get(timeFrame);
  }

  public generatePathForStroke(width: number, height: number): string {
    return `
      M ${width - 1} ${height - 1}
      C ${width * 0.8} ${height} ${width * 0.75} ${height * 0.4} ${width * 0.58} ${height * 0.4}
      C ${width * 0.45} ${height * 0.4} ${width * 0.4} ${height * 0.6667} ${width * 0.3333} ${height * 0.6667}
      C ${width * 0.1667} ${height * 0.6667} ${width * 0.1667} 1 1 1
    `;
  }

  public generatePathForBackground(width: number, height: number): string {
    return `
      M ${width - 1} ${height - 1}
      C ${width * 0.8} ${height} ${width * 0.75} ${height * 0.4} ${width * 0.58} ${height * 0.4}
      C ${width * 0.45} ${height * 0.4} ${width * 0.4} ${height * 0.6667} ${width * 0.3333} ${height * 0.6667}
      C ${width * 0.1667} ${height * 0.6667} ${width * 0.1667} 1 1 1
      L 0 ${height}
      L ${width} ${height}
    `;
  }

  // public generatePathForStroke(width: number, height: number): string {
  //   return `
  //     M ${width + 1} ${height + 1}
  //     C ${width * 0.8 + 1} ${height + 1} ${width * 0.83 + 1} ${height * 0.5 + 1} ${width * 0.6111 + 1} ${height * 0.5 + 1}
  //     C ${width * 0.5556 + 1} ${height * 0.5 + 1} ${width * 0.4444 + 1} ${height * 0.6667 + 1} ${width * 0.3333 + 1} ${height * 0.6667 + 1}
  //     C ${width * 0.1667 + 1} ${height * 0.6667 + 1} ${width * 0.1667 + 1} 1 1 1
  //   `;
  // }

  // public generatePathForBackground(width: number, height: number): string {
  //   return `
  //     M ${width + 1} ${height + 1}
  //     C ${width * 0.8 + 1} ${height + 1} ${width * 0.83 + 1} ${height * 0.5 + 1} ${width * 0.6111 + 1} ${height * 0.5 + 1}
  //     C ${width * 0.5556 + 1} ${height * 0.5 + 1} ${width * 0.4444 + 1} ${height * 0.6667 + 1} ${width * 0.3333 + 1} ${height * 0.6667 + 1}
  //     C ${width * 0.1667 + 1} ${height * 0.6667 + 1} ${width * 0.1667 + 1} 1 1 1
  //     L 0 ${height + 1}
  //     L ${width} ${height + 1}
  //   `;
  // }

  public getChartBackground(): string {
    return this.negative ? 'url(#negative-background)' : 'url(#positive-background)';
  }
}
