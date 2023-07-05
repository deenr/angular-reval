import {Component} from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {
  public readonly collapsedWidth = 82;
  public readonly expandedWidth = 280;
  public collapsed = true;

  public onActivate(): void {
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }

  public collapsedChange(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  public getLeftMargin(): string {
    return this.collapsed ? `${this.collapsedWidth}px` : `${this.expandedWidth}px`;
  }
}
