import {Component} from '@angular/core';
import {Breakpoint} from '@shared/services/breakpoint/breakpoint.enum';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {
  public readonly collapsedWidth = 82;
  public readonly expandedWidth = 280;
  public collapsed = true;

  public sidebarMode: 'over' | 'side';

  public constructor(private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => {
      this.sidebarMode = breakpoint === Breakpoint.XL ? 'side' : 'over';
    });
  }

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }

  public collapsedChange(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  public getLeftMargin(): string {
    return this.collapsed && this.sidebarMode === 'side' ? `${this.collapsedWidth}px` : `${this.expandedWidth}px`;
  }
}
