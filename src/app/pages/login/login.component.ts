import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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

  public constructor(private readonly authService: AuthService) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

  public googleLogin(): void {
    this.authService.googleSignIn();
  }
}
