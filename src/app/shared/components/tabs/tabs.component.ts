import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BreakpointService } from '@core/services/breakpoint.service';
import { StackedLeftDialogComponent } from '@shared/components/stacked-left-dialog/stacked-left-dialog.component';
import { pairwise, startWith } from 'rxjs';
import { DialogCloseType } from '../stacked-left-dialog/dialog-close-type.enum';
import { DialogType } from '../stacked-left-dialog/dialog-type.enum';
import { Tab } from './tab.interface';

@Component({
  standalone: true,
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [CommonModule, MatTabsModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatDialogModule]
})
export class TabsComponent implements OnInit {
  @Input() public tabs: Tab[];
  @Input() public vertical = false;
  @Input() public needsConfirmation = false;
  @Output() public tabChange = new EventEmitter<Tab>();

  public tabControl: FormControl<Tab> = new FormControl(null);

  public isMobile: boolean;

  public constructor(private readonly breakpointService: BreakpointService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
    });

    this.tabControl.setValue(this.tabs[0]);

    this.tabControl.valueChanges.pipe(startWith(this.tabControl.value), pairwise()).subscribe(([previousTab, currentTab]) => {
      this.tabControl.setValue(previousTab, { emitEvent: false });
      this.onTabClick(currentTab, previousTab);
    });
  }

  public onTabClick(newActiveTab: Tab, previousTab: Tab = null): void {
    this.needsConfirmation ? this.openConfirmationDialog(newActiveTab, previousTab) : this.setTabActive(newActiveTab);
  }

  private setTabActive(newActiveTab: Tab): void {
    if (newActiveTab.disabled) {
      return;
    }

    this.tabs = this.tabs.map((tab: Tab) => {
      tab.active = tab.id === newActiveTab.id;
      return tab;
    });

    this.tabControl.setValue(newActiveTab, { emitEvent: false });
    this.tabChange.emit(newActiveTab);
  }

  private openConfirmationDialog(newTab: Tab, previousTab: Tab = null): void {
    this.dialog
      .open(StackedLeftDialogComponent, {
        width: '400px',
        data: {
          type: DialogType.WARNING,
          icon: 'lock',
          title: 'Unsaved changes',
          description: 'Are you sure you want to continue without saving your changes?',
          cancelTitle: 'Cancel',
          confirmTitle: 'Continue'
        }
      })
      .afterClosed()
      .subscribe((closeType: DialogCloseType) => {
        if (closeType === DialogCloseType.CONFIRM) {
          this.setTabActive(newTab);
        } else if (this.isMobile && closeType === DialogCloseType.CANCEL) {
          this.setTabActive(previousTab);
        }
      });
  }
}
