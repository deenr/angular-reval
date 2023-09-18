import {Component, OnInit} from '@angular/core';
import {SettingsTab} from './settings-tab.enum';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatSelectChange} from '@angular/material/select';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakpointService} from '@shared/services/breakpoint/breakpoint.service';
import {Breakpoint} from '@shared/services/breakpoint/breakpoint.enum';
import {Tab} from '@custom-components/tabs/tab.interface';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {User} from '@shared/models/user/user';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '@shared/services/role/role.service';
import {HttpUserService} from '@shared/services/user/http-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public tabs = [
    {id: SettingsTab.DETAILS, name: 'My details', disabled: false, active: true},
    {id: SettingsTab.PASSWORD, name: 'Password', disabled: false, active: false}
  ] as Tab[];

  public settingsTab = SettingsTab;
  public isMobile: boolean;
  public loadingUser: boolean;

  public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<UserRole>;
    faculty: FormControl<Faculty>;
    program: FormControl<Program>;
    universityId: FormControl<string>;
    yearOfGraduation: FormControl<number>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl({value: null, disabled: true}),
    role: new FormControl(null, Validators.required),
    faculty: new FormControl(null),
    program: new FormControl({value: null, disabled: true}),
    universityId: new FormControl(null, Validators.required),
    yearOfGraduation: new FormControl(null)
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
    private readonly userService: HttpUserService
  ) {}

  public ngOnInit(): void {
    const localUserIdAndEmail = JSON.parse(localStorage.getItem('user')) as {id: string; email: string};
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
        this.initialUser.phoneNumber !== this.detailsForm.value.phoneNumber ||
        this.initialUser.faculty !== this.detailsForm.value.faculty ||
        this.initialUser.program !== this.detailsForm.value.program ||
        this.initialUser.yearOfGraduation !== this.detailsForm.value.yearOfGraduation)
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
      email: user.email,
      role: this.roleService.getCurrentRole(),
      faculty: user.faculty,
      program: user.program,
      universityId: user.universityId,
      yearOfGraduation: user.yearOfGraduation as number
    });

    this.detailsForm.controls.role.setValue(this.roleService.getCurrentRole());

    this.detailsForm.controls.email.disable();
    this.detailsForm.controls.role.disable();
    if (user.faculty) {
      this.detailsForm.controls.program.enable();
    }
    this.detailsForm.controls.universityId.disable();
  }
}
