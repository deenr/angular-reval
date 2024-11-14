import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USERS, Users } from '@core/services/api/users/users.interface';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserRoleService } from '@core/services/user-role.service';
import { SkeletonType } from '@shared/directives/skeleton/skeleton-type.enum';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { User } from '@shared/models/user/interfaces/user.interface';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-settings-details',
  templateUrl: './settings-details.component.html',
  styleUrls: ['./settings-details.component.scss']
})
export class SettingsDetailsComponent {
  @Input() public isMobile: boolean;
  @Input() public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
  }>;
  @Input() public loadingUser: boolean;
  @Output() public userUpdated = new EventEmitter<User>();

  public roles = [UserRole.AUTHOR];

  public SkeletonType = SkeletonType;
  public savingDetails = false;

  public constructor(
    @Inject(USERS) private readonly usersService: Users,
    private readonly route: ActivatedRoute,
    private readonly localStorageService: LocalStorageService,
    private readonly userRoleService: UserRoleService
  ) {}

  public saveDetails(): void {
    this.detailsForm.markAllAsTouched();

    if (this.detailsForm.valid) {
      const userToSave = this.getUserToSave();

      this.savingDetails = true;
      this.usersService
        .update(this.getUserToSave())
        .pipe(
          take(1),
          finalize(() => (this.savingDetails = false))
        )
        .subscribe(() => this.userUpdated.emit(userToSave as User));
    }
  }

  private getUserToSave(): Partial<User> {
    return {
      id: this.userRoleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE ? this.route.snapshot.paramMap.get('id') : this.localStorageService.getItem(LocalStorageService.USER_ID),
      firstName: this.detailsForm.value.firstName,
      lastName: this.detailsForm.value.lastName,
      email: this.detailsForm.getRawValue().email,
      phoneNumber: this.detailsForm.value.phoneNumber,
      ...(this.userRoleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE ? { role: UserRole.USER } : { role: this.userRoleService.getCurrentRole() }),
      ...(this.userRoleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE ? { joined: new Date() } : {})
    };
  }
}
