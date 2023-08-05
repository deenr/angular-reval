import {Component, OnInit} from '@angular/core';
import {SettingsType} from './settings-type.enum';
import {FormGroup, FormControl} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSelectChange} from '@angular/material/select';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {Breakpoint} from '@shared/services/breakpoint/breakpoint.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public tabForm = new FormGroup({
    tab: new FormControl(SettingsType.DETAILS)
  });

  public settingsType = SettingsType;
  public settingsTypes = [SettingsType.DETAILS, SettingsType.PROFILE, SettingsType.PASSWORD];

  public selectedTab: number;
  public tabs = [
    {id: SettingsType.DETAILS, name: 'My details', disabled: false},
    {id: SettingsType.PROFILE, name: 'Profile', disabled: true},
    {id: SettingsType.PASSWORD, name: 'Password', disabled: true}
  ] as SettingsTab[];
  public isMobile: boolean;

  private settingsTypesTranslation = new Map<SettingsType, string>([
    [SettingsType.DETAILS, 'My details'],
    [SettingsType.PROFILE, 'Profile'],
    [SettingsType.PASSWORD, 'Password']
  ]);

  public constructor(private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => (this.isMobile = breakpoint === Breakpoint.SM || breakpoint === Breakpoint.XS));
  }

  public onTabChange(change: MatSelectChange): void {
    switch (change.value as SettingsType) {
      case SettingsType.DETAILS:
        this.selectedTab = 0;
        break;
      case SettingsType.PROFILE:
        this.selectedTab = 1;
        break;
      case SettingsType.PASSWORD:
        this.selectedTab = 2;
        break;
    }
  }

  public getSettingsTypeTranslation(settingsType: SettingsType): string {
    return this.settingsTypesTranslation.get(settingsType);
  }

  public isTabDisabled(settingsType: SettingsType): boolean {
    return this.tabs.find((tab: SettingsTab) => tab.id === settingsType).disabled;
  }
}

interface SettingsTab {
  id: SettingsType;
  name: string;
  disabled: boolean;
}
