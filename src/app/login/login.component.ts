import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  public ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((test: any) => console.log(test));
  }
}
