import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tab} from './tab.interface';
import {SettingsType} from '@pages/settings/settings-type.enum';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {FormGroup, FormControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {DialogCloseType} from '@custom-components/dialogs/dialog-close-type.enum';
import {TabConfirmationType} from './tab-confirmation-type.enum';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() public tabs: Tab[];
  @Input() public vertical = false;
  @Input() public needsConfirmation = false;
  @Output() public tabChange = new EventEmitter<Tab>();

  public tabForm: FormGroup<{
    tab: FormControl<Tab>;
  }> = new FormGroup({
    tab: new FormControl(null)
  });

  public isMobile: boolean;

  public constructor(private readonly breakpointService: BreakpointService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
    });

    this.tabForm.controls.tab.setValue(this.tabs[0]);
  }

  public onTabClick(tabChange: Tab | MatSelectChange): void {
    const newActiveTab = tabChange instanceof MatSelectChange ? (tabChange.value as Tab) : tabChange;
    this.needsConfirmation ? this.openConfirmationDialog(newActiveTab) : this.setTabActive(newActiveTab);
  }

  private setTabActive(newActiveTab: Tab): void {
    if (newActiveTab.disabled) {
      return;
    }

    this.tabs = this.tabs.map((tab: Tab) => {
      tab.active = tab.id === newActiveTab.id;
      return tab;
    });
    this.tabChange.emit(newActiveTab);
  }

  private openConfirmationDialog(newActiveTab: Tab): void {
    const dialogRef = this.dialog.open(StackedLeftDialogComponent, {
      width: '400px',
      data: {
        type: DialogType.WARNING,
        icon: 'lock',
        title: 'Unsaved changes',
        description: 'Are you sure you want to continue without saving your changes?',
        cancelTitle: 'Cancel',
        confirmTitle: 'Continue'
      }
    });

    dialogRef.afterClosed().subscribe((closeType: DialogCloseType) => {
      if (closeType === DialogCloseType.CONFIRM) {
        this.setTabActive(newActiveTab);
      }
    });
  }
}
