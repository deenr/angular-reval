import {Component} from '@angular/core';
import {RegistrationSteps} from './registration-steps.enum';
import {ProgressStep} from '@custom-components/progress-steps/progress-step.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
    department: FormControl<string>;
    field: FormControl<string>;
    id: FormControl<string>;
    yearOfGraduation: FormControl<string>;
    phoneNumber: FormControl<string>;
  }> = new FormGroup({
    department: new FormControl(null),
    field: new FormControl(null),
    id: new FormControl(null, [Validators.required]),
    yearOfGraduation: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')])
  });

  public registrationSteps = RegistrationSteps;

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
      stepName: RegistrationSteps.EMAIL,
      svgIcon: 'user',
      complete: false,
      current: true,
      text: 'Your details',
      supportingText: 'Enter your email'
    },
    {
      stepName: RegistrationSteps.PASSWORD,
      svgIcon: 'lock',
      complete: false,
      current: false,
      text: 'Choose a password',
      supportingText: 'Choose a secure password'
    },
    {
      stepName: RegistrationSteps.DETAILS,
      svgIcon: 'details',
      complete: false,
      current: false,
      text: 'Personal information',
      supportingText: 'Add the required information'
    },
    {
      stepName: RegistrationSteps.EMAIL_VERIFICATION,
      svgIcon: 'mail',
      complete: false,
      current: false,
      text: 'Verification',
      supportingText: 'Verify your account'
    }
  ] as ProgressStep[];

  public getTitle(): string {
    switch (this.getCurrentProgressStep().stepName) {
      case RegistrationSteps.EMAIL:
        return 'Create an account';
      case RegistrationSteps.PASSWORD:
        return 'Choose a password';
      case RegistrationSteps.DETAILS:
        return 'Enter your details';
      default:
        return '';
    }
  }

  public getSubtitle(): string {
    switch (this.getCurrentProgressStep().stepName) {
      case RegistrationSteps.EMAIL:
        return 'Sign up in less than 2 minutes.';
      case RegistrationSteps.PASSWORD:
        return 'Must be at least 8 characters.';
      default:
        return '';
    }
  }

  public canShowStep(stepName: RegistrationSteps): boolean {
    return this.steps.find((progressStep: ProgressStep) => progressStep.stepName === stepName).current;
  }

  public goToPassword(): void {
    if (this.emailForm.valid) {
      this.getProgressStepByStepName(RegistrationSteps.EMAIL).complete = true;
      this.getProgressStepByStepName(RegistrationSteps.EMAIL).current = false;
      this.getProgressStepByStepName(RegistrationSteps.PASSWORD).current = true;
    }
  }

  public goToDetails(): void {
    if (this.passwordForm.valid) {
      this.getProgressStepByStepName(RegistrationSteps.PASSWORD).complete = true;
      this.getProgressStepByStepName(RegistrationSteps.PASSWORD).current = false;
      this.getProgressStepByStepName(RegistrationSteps.DETAILS).current = true;
    }
  }

  private getCurrentProgressStep(): ProgressStep {
    return this.steps.find((progressStep: ProgressStep) => progressStep.current);
  }

  private getProgressStepByStepName(stepName: RegistrationSteps): ProgressStep {
    return this.steps.find((progressStep: ProgressStep) => progressStep.stepName === stepName);
  }
}
