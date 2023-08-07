import {Component, OnInit} from '@angular/core';
import {SettingsType} from './settings-type.enum';
import {FormGroup, FormControl} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSelectChange} from '@angular/material/select';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {Breakpoint} from '@shared/services/breakpoint/breakpoint.enum';
import {Tab} from '@custom-components/tabs/tab.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public tabs = [
    {id: SettingsType.DETAILS, name: 'My details', disabled: false, active: true},
    {id: SettingsType.PASSWORD, name: 'Password', disabled: true, active: false}
  ] as Tab[];
  public isMobile: boolean;
  public saving: boolean;

  public constructor(private readonly breakpointService: BreakpointService) {}

  public ngOnInit(): void {
    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => (this.isMobile = breakpoint === Breakpoint.SM || breakpoint === Breakpoint.XS));
  }

  public save(): void {}
}
