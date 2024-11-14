import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authentication, AUTHENTICATION } from '@core/services/api/authentication/authentication.interface';
import { ChangePasswordResponse } from '@core/services/api/authentication/supabase-authentication.service';
import { PasswordMatchValidator } from '@shared/helper/validator/password-match-validator';
import { combineLatest, startWith, take } from 'rxjs';
import { SkeletonType } from 'src/app/shared/directives/skeleton/skeleton-type.enum';

@Component({
  selector: 'app-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['./settings-password.component.scss']
})
export class SettingsPasswordComponent implements OnInit {
  @Input() public isMobile: boolean;
  @Input() public passwordForm: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
  }>;
  public savingPassword: boolean;

  public skeletonType = SkeletonType;

  public constructor(@Inject(AUTHENTICATION) private readonly authentication: Authentication) {}

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

        this.passwordForm.controls.newPassword.updateValueAndValidity({ emitEvent: false });
        this.passwordForm.controls.confirmNewPassword.updateValueAndValidity({ emitEvent: false });
      }
    );
  }

  public savePassword(): void {
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      this.savingPassword = true;

      this.authentication
        .updateUserPassword(this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.passwordForm.reset();
            this.savingPassword = false;
          },
          error: (error: any) => {
            if (error === ChangePasswordResponse.PASSWORD_INCORRECT) {
              this.passwordForm.controls.currentPassword.setErrors({ incorrect: true });
            }
            this.savingPassword = false;
          }
        });
    }
  }
}
