import {Component, OnInit} from '@angular/core';
import {RegistrationStep} from './registration-step.enum';
import {ProgressStep} from '@custom-components/progress-steps/progress-step.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {matchValidator} from '@shared/helper/validator/match-validator';
import {AuthService} from '@shared/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public emailForm: FormGroup<{
    email: FormControl<string>;
  }> = new FormGroup({
    email: new FormControl(null, [Validators.required])
  });

  public passwordForm: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    department: FormControl<string>;
    field: FormControl<string>;
    studentId: FormControl<string>;
    yearOfGraduation: FormControl<string>;
    phoneNumber: FormControl<string>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    department: new FormControl(null),
    field: new FormControl(null),
    studentId: new FormControl(null, Validators.required),
    yearOfGraduation: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')])
  });

  public registrationStep = RegistrationStep;

  public faculties = [
    'Sales',
    'Accounting',
    'Marketing',
    'Business Development',
    'Product Management',
    'Research and Development',
    'Training',
    'Support',
    'Legal',
    'Services',
    'Engineering',
    'Human Resources'
  ];

  public fields = [
    'Computer Science',
    'Biology',
    'Chemistry',
    'Physics',
    'Psychology',
    'Sociology',
    'History',
    'Mathematics',
    'Engineering',
    'Environmental Science',
    'Political Science',
    'Economics',
    'Philosophy',
    'Literature',
    'Art History'
  ];

  public steps = [
    {
      stepName: RegistrationStep.EMAIL,
      svgIcon: 'user',
      complete: false,
      current: true,
      text: 'Your details',
      supportingText: 'Enter your email'
    },
    {
      stepName: RegistrationStep.PASSWORD,
      svgIcon: 'lock',
      complete: false,
      current: false,
      text: 'Choose a password',
      supportingText: 'Choose a secure password'
    },
    {
      stepName: RegistrationStep.EMAIL_VERIFICATION,
      svgIcon: 'mail',
      complete: false,
      current: false,
      text: 'Verification',
      supportingText: 'Verify your account'
    },
    {
      stepName: RegistrationStep.DETAILS,
      svgIcon: 'details',
      complete: false,
      current: false,
      text: 'Personal information',
      supportingText: 'Add the required information'
    }
  ] as ProgressStep[];

  public sendingDetails = false;

  public constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public ngOnInit(): void {
    if (this.authService.isVerified) {
      this.setCurrentProgressStep(RegistrationStep.DETAILS);
    } else if (this.authService.isLoggedIn) {
      this.setCurrentProgressStep(RegistrationStep.EMAIL_VERIFICATION);
    } else {
      this.passwordForm.addValidators(matchValidator(this.passwordForm.controls.password, this.passwordForm.controls.confirmPassword));
    }
  }

  public getTitle(): string {
    switch (this.getCurrentProgressStep().stepName) {
      case RegistrationStep.EMAIL:
        return 'Create an account';
      case RegistrationStep.PASSWORD:
        return 'Choose a password';
      case RegistrationStep.DETAILS:
        return 'Enter your details';
      case RegistrationStep.EMAIL_VERIFICATION:
        return 'Check your email';
      default:
        return '';
    }
  }

  public getSubtitle(): string {
    switch (this.getCurrentProgressStep().stepName) {
      case RegistrationStep.EMAIL:
        return 'Sign up in less than 2 minutes.';
      case RegistrationStep.PASSWORD:
        return 'Must be at least 8 characters.';
      case RegistrationStep.EMAIL_VERIFICATION:
        return `We sent a verification link to ${this.emailForm.value.email}`;
      default:
        return '';
    }
  }

  public canShowStep(stepName: RegistrationStep): boolean {
    return this.steps.find((progressStep: ProgressStep) => progressStep.stepName === stepName).current;
  }

  public goToPassword(): void {
    if (this.emailForm.valid) {
      this.setCurrentProgressStep(RegistrationStep.PASSWORD);
    }
  }

  public goToEmailVerification(): void {
    if (this.passwordForm.valid) {
      this.setCurrentProgressStep(RegistrationStep.EMAIL_VERIFICATION);

      this.authService.signUp(this.emailForm.value.email, this.passwordForm.value.password);
    }
  }

  public goToDetails(): void {
    if (this.authService.isVerified) {
      this.setCurrentProgressStep(RegistrationStep.DETAILS);
    }
  }

  public sendDetails(): void {
    if (this.detailsForm.valid) {
      this.sendingDetails = true;

      this.authService
        .setUserDetails(
          this.detailsForm.value.firstName,
          this.detailsForm.value.lastName,
          this.detailsForm.value.department,
          this.detailsForm.value.field,
          this.detailsForm.value.studentId,
          this.detailsForm.value.yearOfGraduation,
          this.detailsForm.value.phoneNumber
        )
        .then(() => this.router.navigateByUrl('/'));
    }
  }

  private setCurrentProgressStep(registrationStep: RegistrationStep): void {
    let progressStepChanged = false;
    this.steps = this.steps.map((progressStep: ProgressStep) => {
      if (!progressStepChanged) {
        if (progressStep.stepName === registrationStep) {
          progressStepChanged = true;
          return {...progressStep, current: true};
        } else {
          return {...progressStep, complete: true, current: false};
        }
      }

      return progressStep;
    });
  }

  private getCurrentProgressStep(): ProgressStep {
    return this.steps.find((progressStep: ProgressStep) => progressStep.current);
  }
}
