import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoint } from '@shared/services/breakpoint/breakpoint.enum';
import { BreakpointService } from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public readonly collapsedWidth = 82;
  public readonly expandedWidth = 280;
  public collapsed = true;
  public isMobile: boolean;
  public isTablet: boolean;

  public sidenavMode: 'over' | 'side';
  public sidenavOpened: boolean;

  public constructor(private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => {
      this.sidenavMode = breakpoint === Breakpoint.XL ? 'side' : 'over';

      if ((this.breakpointService.isMobile && !this.isMobile) || (this.breakpointService.isTablet && !this.isTablet)) {
        this.sidenavOpened = false;
      } else if ((!this.breakpointService.isMobile && this.isMobile) || (!this.breakpointService.isTablet && this.isTablet)) {
        this.sidenavOpened = true;
      }

      this.isMobile = this.breakpointService.isMobile;
      this.isTablet = this.breakpointService.isTablet;
    });

    this.sidenavOpened = !this.isBreakpointMobileOrTablet(this.breakpointService.currentBreakpoint);
  }

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }

  public collapsedChange(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  public getLeftMargin(): string {
    return this.collapsed && this.sidenavMode === 'side' ? `${this.collapsedWidth}px` : `${this.expandedWidth}px`;
  }

  public isBreakpointMobileOrTablet(breakpoint: Breakpoint): boolean {
    return breakpoint === Breakpoint.XS || breakpoint === Breakpoint.SM || breakpoint === Breakpoint.MD;
  }

  public onSidenavToggle(): void {
    if (this.sidenavOpened) {
      this.sidenav.close();
      this.sidenavOpened = false;
    } else {
      this.sidenav.open();
      this.sidenavOpened = true;
    }
  }
}
