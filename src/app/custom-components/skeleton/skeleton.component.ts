import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'skeleton',
  template: ``,
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  private width: string;
  private height: string;

  public constructor(private elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit() {
    const elementRef = this.elementRef.nativeElement;

    elementRef.style.setProperty('--skeleton-width', this.width);
    elementRef.style.setProperty('--skeleton-height', this.height ?? '20px');
  }
}
