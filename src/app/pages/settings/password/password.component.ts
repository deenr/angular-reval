import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PasswordMatchValidator} from '@helper/validator/password-match-validator';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ChangePasswordResponse} from '@shared/services/auth/change-password-response.enum';
import {AuthService} from '@shared/services/auth/auth.service';
import {combineLatest, startWith} from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() public isMobile: boolean;
  @Input() public passwordForm: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
  }>;
  public savingPassword: boolean;

  public skeletonType = SkeletonType;

  public constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    combineLatest([this.passwordForm.controls.currentPassword.valueChanges.pipe(startWith(null)), this.passwordForm.controls.newPassword.valueChanges.pipe(startWith(null))]).subscribe(
      ([currentPassword, newPassword]: [string, string]) => {
        if (currentPassword && newPassword && newPassword.length >= 8) {
          this.passwordForm.controls.confirmNewPassword.setValidators([Validators.required, PasswordMatchValidator.createValidator(this.passwordForm.controls.newPassword)]);
        } else if (currentPassword) {
          this.passwordForm.controls.newPassword.setValidators([Validators.required, Validators.minLength(8)]);
        } else {
          this.passwordForm.controls.newPassword.setValidators(Validators.required);
          this.passwordForm.controls.confirmNewPassword.setValidators(Validators.required);
        }

        this.passwordForm.controls.newPassword.updateValueAndValidity({emitEvent: false});
        this.passwordForm.controls.confirmNewPassword.updateValueAndValidity({emitEvent: false});
      }
    );
  }

  public savePassword(): void {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      this.savingPassword = true;

      this.authService
        .updateUserPassword(this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword)
        .then((response: ChangePasswordResponse) => {
          this.passwordForm.reset();
          this.savingPassword = false;
        })
        .catch((reason: ChangePasswordResponse) => {
          if (reason === ChangePasswordResponse.PASSWORD_INCORRECT) {
            this.passwordForm.controls.currentPassword.setErrors({incorrect: true});
          }
          this.savingPassword = false;
        });
    }
  }
}
