import {AfterViewInit, Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BadgeSize} from '@custom-components/badge/badge-size.enum';
import {BadgeComponent} from '@custom-components/badge/badge.component';
import {Color} from '@shared/enums/general/colors.enum';

@Component({
  selector: 'app-multiple-badges',
  templateUrl: './multiple-badges.component.html',
  styleUrls: ['./multiple-badges.component.scss']
})
export class MultipleBadgesComponent implements AfterViewInit {
  @ViewChildren(BadgeComponent) public badgeComponents: QueryList<BadgeComponent>;
  @ViewChild('wrapper') public wrapper: ElementRef<HTMLElement>;
  @ViewChild('overflowIndicator') public overflowIndicator: BadgeComponent;
  @Input() public badges: string[];
  @Input() public column: any;

  public overflowBadges: BadgeComponent[] = [];

  private readonly GAP_BETWEEN_BADGE = 8;

  @HostListener('window:resize')
  public onResize(): void {
    this.overflowBadges = [];
    setTimeout(() => this.setVisibleBadges());
  }

  public ngAfterViewInit(): void {
    this.overflowBadges = [];
    setTimeout(() => this.setVisibleBadges());
  }

  public getBadgeTranslationKey(value: any): string {
    return `${this.column.translationKey}.${value}`;
  }

  public getBadgeSize(): BadgeSize {
    return this.column.badgeProperties.size;
  }

  public getBadgeColor(value: any): Color {
    return this.column.badgeProperties.colors.get(value) ?? Color.GREY;
  }

  private setVisibleBadges(): void {
    const availableWidth = this.wrapper.nativeElement.offsetWidth;
    let usedWidth = 0;

    for (const badgeComponent of this.badgeComponents) {
      const badgeElement = badgeComponent.elementRef.nativeElement as HTMLElement;
      badgeElement.classList.remove('hidden');

      usedWidth += badgeElement.offsetWidth;

      if (usedWidth > availableWidth) {
        badgeElement.classList.add('hidden');
        this.overflowBadges.push(badgeComponent);
      } else {
        badgeElement.classList.remove('hidden');
      }

      usedWidth += this.GAP_BETWEEN_BADGE;
    }

    setTimeout(() => {
      if (this.overflowIndicator) {
        const overflowElement = this.overflowIndicator.elementRef.nativeElement as HTMLElement;

        let usedVisibleWidth = 0;
        for (const badgeComponent of this.badgeComponents) {
          const badgeElement = badgeComponent.elementRef.nativeElement as HTMLElement;
          usedVisibleWidth = badgeElement.classList.contains('hidden') ? usedVisibleWidth : usedVisibleWidth + badgeElement.offsetWidth + this.GAP_BETWEEN_BADGE;
        }

        usedVisibleWidth += overflowElement.offsetWidth;

        if (usedVisibleWidth > availableWidth) {
          let index = 0;
          for (const badgeComponent of this.badgeComponents) {
            const badgeElement = badgeComponent.elementRef.nativeElement as HTMLElement;
            if (badgeElement.classList.contains('hidden')) {
              const previousBadgeElement = badgeElement.previousSibling;
              (previousBadgeElement as HTMLElement).classList.add('hidden');
              this.overflowBadges.push(this.badgeComponents.get(index - 1));
            }

            index++;
          }
        }
      }
    });
  }
}
