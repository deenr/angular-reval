import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RegistrationStep} from '@pages/register/registration-step.enum';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  public isEmailVerified = true;

  public constructor(private readonly authService: AuthService, private readonly route: ActivatedRoute, private readonly router: Router) {}

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

  public continueToRegister(): void {
    this.router.navigateByUrl('register');
  }

  private checkForVerifyingEmail(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const oobCode = params['oobCode'];
      if (oobCode) {
        this.verifyEmail(oobCode);
      } else {
        this.router.navigateByUrl('not-found');
      }
    });
  }

  private verifyEmail(oobCode: string): void {
    this.isEmailVerified = false;
    this.authService
      .verifyEmail(oobCode)
      .then(() => {
        this.authService.refreshUser();
        this.isEmailVerified = true;
      })
      .catch((reason) => {
        alert(reason['code']);
      });
  }
}
