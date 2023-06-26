import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(null)
  });

  public constructor(private readonly authService: AuthService, private readonly dialog: MatDialog) {}

  public login(): void {
    this.openDashboard();
    // if (this.loginForm.valid) {
    //   this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
    // }
  }

  public googleLogin(): void {
    this.openDashboard();
    // this.authService.googleSignIn();
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
