import {Component, Input, OnInit} from '@angular/core';
import {Tab} from './tab.interface';
import {SettingsType} from '@pages/settings/settings-type.enum';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() public tabs: Tab[];
  @Input() public vertical = false;

  public tabForm: FormGroup<{
    tab: FormControl<Tab>;
  }> = new FormGroup({
    tab: new FormControl(null)
  });

  public isMobile: boolean;

  public constructor(private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe(() => {
      this.isMobile = this.breakpointService.isMobile;
    });

    this.tabForm.controls.tab.setValue(this.tabs[0]);
  }

  public setTabActive(newActiveTab: Tab): void {
    if (newActiveTab.disabled) {
      return;
    }

    this.tabs = this.tabs.map((tab: Tab) => {
      tab.active = tab.id === newActiveTab.id;
      return tab;
    });
  }
}
