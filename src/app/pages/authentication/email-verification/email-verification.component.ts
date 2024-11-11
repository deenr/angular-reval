import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogType } from '@custom-components/dialogs/dialog-type.enum';
import { StackedLeftDialogComponent } from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import { AuthService } from '@shared/services/auth/auth.service';
import { AuthResponse } from '@supabase/supabase-js';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  public isEmailVerified = false;

  public constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService, private readonly dialog: MatDialog) {}

  public ngOnInit(): void {
    this.checkForVerifyingEmail();
  }

  public getHeaderIcon(): string {
    return this.isEmailVerified ? 'check-circle' : 'mail';
  }

  public getHeaderTitle(): string {
    return this.isEmailVerified ? 'Email verified' : 'Verifying Email...';
  }

  public getHeaderDescription(): string {
    return this.isEmailVerified ? 'Congratulations! Your email has been successfully verified.' : 'Please wait while we verify your email. This process may take a few moments. ';
  }

  public continueToLogin(): void {
    this.router.navigateByUrl('login');
  }

  private checkForVerifyingEmail(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      const email = params['email'];
      if (token && email) {
        this.verifyEmail(params['token'], params['email']);
      }
    });
  }

  private verifyEmail(token: string, email: string): void {
    this.authService.verifyEmail(token, email).then(({ data, error }: AuthResponse) => {
      if (error) {
        this.dialog.open(StackedLeftDialogComponent, {
          width: '450px',
          data: {
            type: DialogType.ERROR,
            icon: 'exclamation-circle',
            title: 'Error verifying email',
            description: error.message,
            cancelRoute: '/login',
            confirmRoute: '/login'
          }
        });
      } else {
        this.isEmailVerified = true;
      }
    });
  }
}
