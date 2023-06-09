import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(null),
  });

  public login(): void {
    console.log(this.loginForm.value, this.loginForm.controls.email.errors);
  }
}