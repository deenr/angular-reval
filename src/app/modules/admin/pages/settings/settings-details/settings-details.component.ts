import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { RoleService } from '@core/services/role/role.service';
import { HttpUserService } from '@core/services/user/http-user.service';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { User } from '@shared/models/user/user.model';
import { SkeletonType } from 'src/app/shared/directives/skeleton/skeleton-type.enum';

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

  public skeletonType = SkeletonType;
  public savingDetails = false;

  public constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly userService: HttpUserService,
    private readonly localStorageService: LocalStorageService
  ) {}

  public saveDetails(): void {
    this.detailsForm.markAllAsTouched();

    if (this.detailsForm.valid) {
      this.savingDetails = true;
      if (this.roleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
        const userToSave = this.getUserToSave(this.route.snapshot.paramMap.get('id'));
        this.authService
          .setUserInfo(userToSave)
          .then(() => {
            this.savingDetails = false;
            this.userUpdated.emit(userToSave);
          })
          .catch(() => {});
      } else {
        const currentUser = JSON.parse(this.localStorageService.getItem('user')) as { id: string };
        const userToSave = this.getUserToSave(currentUser.id);
        this.userService.updateUserInfo(userToSave).subscribe(() => {
          this.savingDetails = false;
          this.userUpdated.emit(userToSave);
        });
      }
    }
  }

  private getUserToSave(id: string): User {
    return null;
    // return new User(
    //   id,
    //   this.detailsForm.value.firstName,
    //   this.detailsForm.value.lastName,
    //   this.detailsForm.value.email,
    //   this.detailsForm.value.universityId,
    //   this.detailsForm.value.role,
    //   new Date(),
    //   this.detailsForm.value.phoneNumber,
    //   this.detailsForm.value.faculty,
    //   this.detailsForm.value.program,
    //   this.detailsForm.value.yearOfGraduation
    // );
  }
}
