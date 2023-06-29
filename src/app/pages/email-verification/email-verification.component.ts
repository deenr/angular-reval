import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SupabaseService} from '@shared/services/supabase/supabase.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  public isEmailVerified = false;

  public constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router, private readonly supabaseService: SupabaseService) {}

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
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      const email = params['email'];
      if (token && email) {
        this.verifyEmail(params['token'], params['email']);
      }
    });
  }

  private verifyEmail(token: string, email: string): void {
    this.supabaseService.verifyEmail(token, email).then(() => {
      this.isEmailVerified = true;
    });
  }
}
