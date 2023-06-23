import {Component, OnInit} from '@angular/core';
import {RegistrationStep} from './registration-step.enum';
import {ProgressStep} from '@custom-components/progress-steps/progress-step.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {matchValidator} from '@shared/helper/validator/match-validator';
import {AuthService} from '@shared/services/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {UserRole} from '@shared/enums/user-role.enum';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {ArchitectureAndArtsProgram} from '@shared/enums/faculty-and-department/architecture-and-arts-program.enum';
import {BusinessProgram} from '@shared/enums/faculty-and-department/business-program.enum';
import {EngineeringTechnologyProgram} from '@shared/enums/faculty-and-department/engineering-technology-program.enum';
import {LawProgram} from '@shared/enums/faculty-and-department/law-program.enum';
import {MedicineAndLifeProgram} from '@shared/enums/faculty-and-department/medicine-and-life-program.enum';
import {RehabilitationSciencesProgram} from '@shared/enums/faculty-and-department/rehabilitation-sciences-program.enum';
import {SciencesProgram} from '@shared/enums/faculty-and-department/sciences-program.enum';
import {SocialSciencesProgram} from '@shared/enums/faculty-and-department/social-sciences-program.enum';
import {TransportationSciencesProgram} from '@shared/enums/faculty-and-department/transportation-sciences-program.enum';
import {MatSelectChange} from '@angular/material/select';

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
    faculty: FormControl<Faculty>;
    program: FormControl<Program>;
    studentId: FormControl<string>;
    yearOfGraduation: FormControl<string>;
    phoneNumber: FormControl<string>;
    role: FormControl<UserRole>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    faculty: new FormControl(null),
    program: new FormControl({value: null, disabled: true}),
    studentId: new FormControl(null, Validators.required),
    yearOfGraduation: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    role: new FormControl(null, Validators.required)
  });

  public registrationStep = RegistrationStep;

  public faculties = Object.keys(Faculty).map((faculty: string) => faculty as Faculty);
  public facultiesTranslation = new Map<Faculty, string>([
    [Faculty.ARCHITECTURE_AND_ARTS, 'Architecture and Arts'],
    [Faculty.BUSINESS_ECONOMICS, 'Business Economics'],
    [Faculty.MEDICINE_AND_LIFE_SCIENCES, 'Medicine Sciences'],
    [Faculty.ENGINEERING_TECHNOLOGY, 'Engineering Technology'],
    [Faculty.TRANSPORTATION_SCIENCES, 'Transportation Sciences'],
    [Faculty.LAW, 'Law'],
    [Faculty.REHABILITATION_SCIENCES, 'Rehabilitation Sciences'],
    [Faculty.SOCIAL_SCIENCES, 'Social Sciences'],
    [Faculty.SCIENCES, 'Sciences'],
    [Faculty.EDUCATIONAL_STUDIES, 'Educational Studies']
  ]);

  public programTranslations = new Map<Program, string>([
    [ArchitectureAndArtsProgram.ARCHITECTURE, 'Architecture'],
    [ArchitectureAndArtsProgram.INTERIOR_ARCHITECTURE, 'Interior architecture'],
    [BusinessProgram.BUSINESS_ECONOMICS, 'Business economics'],
    [BusinessProgram.BUSINESS_ENGINEERING, 'Business engineering'],
    [BusinessProgram.BUSINESS_AND_INFORMATION_SYSTEMS_ENGINEERING, 'Business and information'],
    [BusinessProgram.BUSINESS_ADMINISTRATION, 'Business adiministration'],
    [BusinessProgram.MANAGEMENT, 'Management'],
    [EngineeringTechnologyProgram.ENGINEERING_TECHNOLOGY, 'Engineering technology'],
    [LawProgram.LAWS, 'Laws'],
    [MedicineAndLifeProgram.MEDICINE, 'Medicine'],
    [MedicineAndLifeProgram.BIOMEDICAL_SCIENCES, 'Biomedical sciences'],
    [MedicineAndLifeProgram.NURSING_AND_MIDWIFERY, 'Nursing and midwifery'],
    [MedicineAndLifeProgram.HEALTH_CARE_ENGINEERING, 'Health case engineering'],
    [RehabilitationSciencesProgram.REHABILITATION_SCIENCES, 'Rehabilitation sciences'],
    [RehabilitationSciencesProgram.PHYSIOTHERAPY, 'Physiotherapy'],
    [SciencesProgram.BIOLOGY, 'Biology'],
    [SciencesProgram.CHEMISTRY, 'Chemistry'],
    [SciencesProgram.PHYSICS, 'Physics'],
    [SciencesProgram.COMPUTER_SCIENCE, 'Computer science'],
    [SciencesProgram.MATHEMATICS, 'Mathematics'],
    [SciencesProgram.STATISTICS_AND_DATA_SCIENCE, 'Statistics'],
    [SciencesProgram.MATERIOMICS, 'Materiomics'],
    [SocialSciencesProgram.SOCIAL_SCIENCES, 'Social sciences'],
    [TransportationSciencesProgram.TRANSPORTATION_SCIENCES, 'Transportation sciences']
  ]);

  public roles = [UserRole.STUDENT, UserRole.PHD, UserRole.PROFESSOR];
  public rolesTranslation = new Map<UserRole, string>([
    [UserRole.STUDENT, 'Student'],
    [UserRole.PHD, 'PhD student'],
    [UserRole.PROFESSOR, 'Professor']
  ]);

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

  public constructor(private readonly authService: AuthService, private readonly router: Router, private readonly dialog: MatDialog) {}

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
    this.openDashboard();
    // if (this.emailForm.valid) {
    //   this.setCurrentProgressStep(RegistrationStep.PASSWORD);
    // }
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
          this.detailsForm.value.faculty,
          this.detailsForm.value.program,
          this.detailsForm.value.studentId,
          this.detailsForm.value.yearOfGraduation,
          this.detailsForm.value.phoneNumber
        )
        .then(() => this.router.navigateByUrl('/'));
    }
  }

  public openDashboard(): void {
    this.dialog.open(StackedLeftDialogComponent, {
      width: '400px',
      data: {
        type: DialogType.WARNING,
        icon: 'mail',
        title: 'Dashboard is not available yet',
        description: 'Our team is diligently working towards making our incredible dashboard available to you.'
      }
    });
  }

  public getSectionMaxWidth(): string {
    return this.getCurrentProgressStep().stepName === RegistrationStep.DETAILS ? '500px' : '360px';
  }

  public getRoleTranslation(userRole: UserRole): string {
    return this.rolesTranslation.get(userRole);
  }

  public getFacultyTranslation(faculty: Faculty): string {
    return this.facultiesTranslation.get(faculty);
  }

  public getPrograms(): Program[] {
    switch (this.detailsForm.value.faculty) {
      case Faculty.ARCHITECTURE_AND_ARTS:
        return Object.keys(ArchitectureAndArtsProgram).map((program: string) => program as ArchitectureAndArtsProgram);
      case Faculty.BUSINESS_ECONOMICS:
        return Object.keys(BusinessProgram).map((program: string) => program as BusinessProgram);
      case Faculty.ENGINEERING_TECHNOLOGY:
        return Object.keys(EngineeringTechnologyProgram).map((program: string) => program as EngineeringTechnologyProgram);
      case Faculty.LAW:
        return Object.keys(LawProgram).map((program: string) => program as LawProgram);
      case Faculty.MEDICINE_AND_LIFE_SCIENCES:
        return Object.keys(MedicineAndLifeProgram).map((program: string) => program as MedicineAndLifeProgram);
      case Faculty.REHABILITATION_SCIENCES:
        return Object.keys(RehabilitationSciencesProgram).map((program: string) => program as RehabilitationSciencesProgram);
      case Faculty.SCIENCES:
        return Object.keys(SciencesProgram).map((program: string) => program as SciencesProgram);
      case Faculty.SOCIAL_SCIENCES:
        return Object.keys(SocialSciencesProgram).map((program: string) => program as SocialSciencesProgram);
      case Faculty.TRANSPORTATION_SCIENCES:
        return Object.keys(TransportationSciencesProgram).map((program: string) => program as TransportationSciencesProgram);

      default:
        return null;
    }
  }

  public getProgramTranslation(program: Program): string {
    return this.programTranslations.get(program);
  }

  public onFacultyChange(selectChange: MatSelectChange): void {
    const faculty = selectChange.value as Faculty;
    Object.values(Faculty).includes(faculty) ? this.detailsForm.controls.program.enable() : this.detailsForm.controls.program.disable();
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

type Program =
  | ArchitectureAndArtsProgram
  | BusinessProgram
  | EngineeringTechnologyProgram
  | LawProgram
  | MedicineAndLifeProgram
  | RehabilitationSciencesProgram
  | SciencesProgram
  | SocialSciencesProgram
  | TransportationSciencesProgram;
