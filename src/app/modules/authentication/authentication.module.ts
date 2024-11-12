import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProgressStepsComponent } from '@modules/authentication/components/progress-steps/progress-steps.component';
import { VerificationCodeInputComponent } from '@modules/authentication/components/verification-code-input/verification-code-input.component';
import { DividerWithTextComponent } from '@shared/components/divider-with-text/divider-with-text.component';
import { ProgressButtonComponent } from '@shared/components/progress-button/progress-button.component';
import { HasErrorDirective } from '@shared/directives/has-error/has-error.directive';
import { AuthenticationRoutingModule } from './authentication.routes';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [AuthenticationComponent, EmailVerificationComponent, LoginComponent, RegisterComponent, VerificationCodeInputComponent, ProgressStepsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthenticationRoutingModule,
    ProgressButtonComponent,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    DividerWithTextComponent,
    HasErrorDirective
  ]
})
export class AuthenticationModule {}
