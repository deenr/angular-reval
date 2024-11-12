import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
  @Input() public sidenavOpened: boolean;
  @Output() public sidenavToggle = new EventEmitter();

  public opacity = 0;

  public ngOnInit() {
    document.getElementsByClassName('mat-drawer-content')[0].addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  public ngOnDestroy() {
    document.getElementsByClassName('mat-drawer-content')[0].removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  private onWindowScroll(): void {
    const scrollTop = document.getElementsByClassName('mat-drawer-content')[0].scrollTop;
    this.opacity = scrollTop / 80 < 1 ? scrollTop / 80 : 1;
  }
}
