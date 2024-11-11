import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tab } from '@custom-components/tabs/tab.interface';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { User } from '@shared/models/user/user.model';
import { Breakpoint } from '@shared/services/breakpoint/breakpoint.enum';
import { BreakpointService } from '@shared/services/breakpoint/breakpoint.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { RoleService } from '@shared/services/role/role.service';
import { HttpUserService } from '@shared/services/user/http-user.service';
import { SettingsTab } from './settings-tab.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public tabs = [
    { id: SettingsTab.DETAILS, name: 'My details', disabled: false, active: true },
    { id: SettingsTab.PASSWORD, name: 'Password', disabled: false, active: false }
  ] as Tab[];

  public settingsTab = SettingsTab;
  public isMobile: boolean;
  public loadingUser: boolean;

  public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl({ value: null, disabled: true })
  });

  public passwordForm: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
  }> = new FormGroup({
    currentPassword: new FormControl(null, Validators.required),
    newPassword: new FormControl(null, Validators.required),
    confirmNewPassword: new FormControl(null, Validators.required)
  });

  private initialUser: User;

  public constructor(
    private readonly breakpointService: BreakpointService,
    private readonly roleService: RoleService,
    private readonly route: ActivatedRoute,
    private readonly userService: HttpUserService,
    private readonly localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    const localUserIdAndEmail = JSON.parse(this.localStorageService.getItem('user')) as { id: string; email: string };
    if (this.route.snapshot.paramMap.get('id') && this.roleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
      this.detailsForm.controls.email.setValue(localUserIdAndEmail.email);
      this.loadingUser = false;
    } else {
      this.userService.getUserInfoById(localUserIdAndEmail?.id).subscribe((user: User) => {
        this.initialUser = user;
        this.setSettingsDetailsForm(this.initialUser);
        this.loadingUser = false;
      });
    }

    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => (this.isMobile = breakpoint === Breakpoint.SM || breakpoint === Breakpoint.XS));
  }

  public isTabActive(settingsTab: SettingsTab): boolean {
    return this.getActiveTab().id === settingsTab;
  }

  public hasUnsavedChanges(): boolean {
    return this.hasUnsavedDetailsChanges() || this.hasUnsavedPasswordChanges();
  }

  public onUserUpdate(user: User): void {
    this.initialUser = user;
  }

  private hasUnsavedDetailsChanges(): boolean {
    return (
      this.getActiveTab().id === SettingsTab.DETAILS &&
      this.initialUser &&
      this.detailsForm &&
      this.roleService.getCurrentRole() !== UserRole.INCOMPLETE_PROFILE &&
      (this.initialUser.firstName !== this.detailsForm.value.firstName ||
        this.initialUser.lastName !== this.detailsForm.value.lastName ||
        this.initialUser.phoneNumber !== this.detailsForm.value.phoneNumber)
    );
  }

  private getActiveTab(): Tab {
    return this.tabs.find((tab: Tab) => tab.active);
  }

  private hasUnsavedPasswordChanges(): boolean {
    return this.getActiveTab().id === SettingsTab.PASSWORD && this.passwordForm.dirty;
  }

  public onTabChange(): void {
    this.setSettingsDetailsForm(this.initialUser);
    this.passwordForm.reset();
  }

  private setSettingsDetailsForm(user: User): void {
    this.detailsForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email
    });
  }
}
