import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AUTHENTICATION, Authentication } from '@core/services/api/authentication/authentication.interface';
import { USERS, Users } from '@core/services/api/users/users.interface';
import { UserRoleService } from '@core/services/user-role.service';
import { DialogType } from '@shared/components/stacked-left-dialog/dialog-type.enum';
import { StackedLeftDialogComponent } from '@shared/components/stacked-left-dialog/stacked-left-dialog.component';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { combineLatest, finalize, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    remember: new FormControl({ value: null, disabled: true })
  });
  public loadingLogin = false;

  public constructor(
    @Inject(USERS) private readonly usersService: Users,
    @Inject(AUTHENTICATION) private readonly authentication: Authentication,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userRoleService: UserRoleService
  ) {}

  public ngOnInit(): void {
    combineLatest([this.loginForm.controls.email.valueChanges, this.loginForm.controls.password.valueChanges]).subscribe(() => {
      if (this.loginForm.controls.email.hasError('invalid')) {
        this.loginForm.controls.email.setErrors({ invalid: null });
        this.loginForm.controls.email.updateValueAndValidity();
      }
      if (this.loginForm.controls.password.hasError('invalid')) {
        this.loginForm.controls.password.setErrors({ invalid: null });
        this.loginForm.controls.password.updateValueAndValidity();
      }
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loadingLogin = true;
      this.authentication
        .signIn(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(
          take(1),
          switchMap(({ data, error }) => {
            if (error) {
              throw error;
            }
            return this.usersService.getById(data.user.id);
          }),
          finalize(() => (this.loadingLogin = false))
        )
        .subscribe(({ id, role }) => {
          if (role === UserRole.INCOMPLETE_PROFILE) {
            this.router.navigate([`/admin/settings/${id}`]);
          } else {
            this.router.navigate(['/admin']);
          }
        });
    }
  }

  public googleLogin(): void {
    this.openDashboard();
  }

  private openDashboard(): void {
    this.dialog.open(StackedLeftDialogComponent, {
      width: '400px',
      data: {
        type: DialogType.WARNING,
        icon: 'lock',
        title: 'Log in with Google not available',
        description: 'Logging in with Google will soon be available, making sign-in even more convenient for you.'
      }
    });
  }
}
