import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USERS, Users } from '@core/services/api/users/users.interface';
import { Breakpoint, BreakpointService } from '@core/services/breakpoint.service';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { UserStatus } from '@shared/models/user/enums/user-status.enum';
import { User } from '@shared/models/user/interfaces/user.interface';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public isMobile: boolean;
  public loadingUser: boolean;

  public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<UserRole>;
    status: FormControl<UserStatus>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl({ value: null, disabled: true }),
    role: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required)
  });

  public SkeletonType = SkeletonType;
  public savingDetails = false;

  public roles = [UserRole.USER, UserRole.AUTHOR, UserRole.ADMIN];
  public statuses = [UserStatus.APPROVED, UserStatus.DENIED];

  public constructor(
    @Inject(USERS) private readonly usersService: Users,
    private readonly breakpointService: BreakpointService,
    private readonly route: ActivatedRoute,
    public readonly location: Location
  ) {}

  public ngOnInit(): void {
    this.usersService
      .getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        take(1),
        finalize(() => (this.loadingUser = false))
      )
      .subscribe((user: User) => {
        this.setSettingsDetailsForm(user);
      });

    this.breakpointService.observe().subscribe((breakpoint: Breakpoint) => (this.isMobile = breakpoint === Breakpoint.SM || breakpoint === Breakpoint.XS));
  }

  public saveDetails(): void {
    this.detailsForm.markAllAsTouched();

    if (this.detailsForm.valid) {
      this.savingDetails = true;
      this.usersService
        .update(this.getUserToSave())
        .pipe(
          take(1),
          finalize(() => (this.savingDetails = false))
        )
        .subscribe(() => this.location.back());
    }
  }

  private getUserToSave(): Partial<User> {
    return {
      id: this.route.snapshot.paramMap.get('id'),
      firstName: this.detailsForm.value.firstName,
      lastName: this.detailsForm.value.lastName,
      email: this.detailsForm.getRawValue().email,
      phoneNumber: this.detailsForm.value.phoneNumber,
      role: this.detailsForm.value.role,
      status: this.detailsForm.value.status
    };
  }

  private setSettingsDetailsForm(user: User): void {
    this.detailsForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      status: user.status
    });
  }
}
