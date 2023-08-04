import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {
  @Input() public sidenavOpened: boolean;
  @Output() public sidenavToggle = new EventEmitter();

  public opacity = 0;

  public constructor(private readonly dialog: MatDialog) {}

  public ngOnInit() {
    document.getElementsByClassName('mat-drawer-content')[0].addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  public ngOnDestroy() {
    document.getElementsByClassName('mat-drawer-content')[0].removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  public openDashboard(): void {
    this.dialog.open(StackedLeftDialogComponent, {
      width: '400px',
      data: {
        type: DialogType.WARNING,
        icon: 'lock',
        title: 'Dashboard is not available yet',
        description: 'Our team is diligently working towards making our incredible dashboard available to you.'
      }
    });
  }

  private onWindowScroll(): void {
    const scrollTop = document.getElementsByClassName('mat-drawer-content')[0].scrollTop;
    this.opacity = scrollTop / 80 < 1 ? scrollTop / 80 : 1;
  }
}
