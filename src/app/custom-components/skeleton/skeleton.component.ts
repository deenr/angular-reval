import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'skeleton',
  template: ``,
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  private width: string;
  private minWidth: string;
  private height: string;
  private marginTop: string;
  private borderRadius: string;
  private gridArea: string;

  public constructor(private elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit() {
    const elementRef = this.elementRef.nativeElement;

    elementRef.style.setProperty('--skeleton-width', this.width);
    elementRef.style.setProperty('--skeleton-min-width', this.minWidth);
    elementRef.style.setProperty('--skeleton-height', this.height ?? '20px');
    elementRef.style.setProperty('--skeleton-margin-top', this.marginTop);
    elementRef.style.setProperty('--skeleton-border-radius', this.borderRadius ?? '8px');
    elementRef.style.setProperty('--skeleton-grid-area', this.gridArea);
  }
}
