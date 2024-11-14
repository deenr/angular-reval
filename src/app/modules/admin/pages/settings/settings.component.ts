import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USERS, Users } from '@core/services/api/users/users.interface';
import { Breakpoint, BreakpointService } from '@core/services/breakpoint.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserRoleService } from '@core/services/user-role.service';
import { Tab } from '@shared/components/tabs/tab.interface';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { User } from '@shared/models/user/interfaces/user.interface';
import { finalize, take } from 'rxjs';
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
    @Inject(USERS) private readonly usersService: Users,
    private readonly breakpointService: BreakpointService,
    private readonly route: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
    private readonly userRoleService: UserRoleService
  ) {}

  public ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') && this.userRoleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
      this.usersService
        .getById(this.route.snapshot.paramMap.get('id'))
        .pipe(
          take(1),
          finalize(() => (this.loadingUser = false))
        )
        .subscribe(({ email }) => {
          this.detailsForm.controls.email.setValue(email);
        });
    } else {
      this.usersService
        .getById(this.localStorageService.getItem(LocalStorageService.USER_ID))
        .pipe(
          take(1),
          finalize(() => (this.loadingUser = false))
        )
        .subscribe((user: User) => {
          this.initialUser = user;
          this.setSettingsDetailsForm(this.initialUser);
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
      this.userRoleService.getCurrentRole() !== UserRole.INCOMPLETE_PROFILE &&
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
