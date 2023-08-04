import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {SupabaseService} from '@shared/services/supabase/supabase.service';
import {AuthError, AuthTokenResponse, OAuthResponse} from '@supabase/supabase-js';
import {combineLatest} from 'rxjs';

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
    remember: new FormControl(null)
  });
  public loadingLogin = false;

  public constructor(private readonly dialog: MatDialog, private readonly supabaseService: SupabaseService, private readonly router: Router) {}

  public ngOnInit(): void {
    combineLatest([this.loginForm.controls.email.valueChanges, this.loginForm.controls.password.valueChanges]).subscribe(() => {
      if (this.loginForm.controls.email.hasError('invalid')) {
        this.loginForm.controls.email.setErrors({invalid: null});
        this.loginForm.controls.email.updateValueAndValidity();
      }
      if (this.loginForm.controls.password.hasError('invalid')) {
        this.loginForm.controls.password.setErrors({invalid: null});
        this.loginForm.controls.password.updateValueAndValidity();
      }
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loadingLogin = true;
      this.supabaseService
        .signIn(this.loginForm.value.email, this.loginForm.value.password)
        .then(([user, error]: [{id: string; role: UserRole}, AuthError]) => {
          if (user) {
            if (user.role === UserRole.INCOMPLETE_PROFILE) {
              this.router.navigate([`/app/settings/${user.id}`]);
            } else {
              this.router.navigate(['/app']);
            }
          }
        })
        .catch(([error]: [AuthError]) => {
          this.loadingLogin = false;
          this.loginForm.controls.email.setErrors({invalid: true});
          this.loginForm.controls.password.setErrors({invalid: true});
        });
    }
  }

  public googleLogin(): void {
    this.openDashboard();
    // this.supabaseService.googleSignIn();
  }

  private openDashboard(): void {
    this.dialog.open(StackedLeftDialogComponent, {
      width: '400px',
      data: {
        type: DialogType.WARNING,
        icon: 'lock',
        title: 'Dashboard is not available yet',
        description: 'Our team is diligently working towards making our incredible dashboard available to you.'
      }
    });
  }
}
