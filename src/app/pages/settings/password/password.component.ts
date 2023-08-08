import {Component, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  @Input() public isMobile: boolean;
  @Input() public passwordForm: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
  }>;
  public savingPassword: boolean;

  public skeletonType = SkeletonType;

  public savePassword(): void {}
}
