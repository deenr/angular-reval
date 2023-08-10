import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss']
})
export class NavigationSidebarComponent {
  @Output() public sidenavClose = new EventEmitter();

  public constructor(private readonly dialog: MatDialog) {}

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
}
