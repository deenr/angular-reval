import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {UserRole} from '@shared/enums/user-role.enum';
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
import {Program} from '../register.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})
export class RegisterDetailsComponent {
  public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    faculty: FormControl<Faculty>;
    program: FormControl<Program>;
    universityId: FormControl<string>;
    yearOfGraduation: FormControl<string>;
    phoneNumber: FormControl<string>;
    role: FormControl<UserRole>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    faculty: new FormControl(null),
    program: new FormControl({value: null, disabled: true}),
    universityId: new FormControl(null),
    yearOfGraduation: new FormControl(null),
    role: new FormControl(null)
  });

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
    [ArchitectureAndArtsProgram.INTERIOR_ARCHITECTURE, 'Interior Architecture'],
    [BusinessProgram.BUSINESS_ECONOMICS, 'Business Economics'],
    [BusinessProgram.BUSINESS_ENGINEERING, 'Business Engineering'],
    [BusinessProgram.BUSINESS_AND_INFORMATION_SYSTEMS_ENGINEERING, 'Business and Information'],
    [BusinessProgram.BUSINESS_ADMINISTRATION, 'Business Administration'],
    [BusinessProgram.MANAGEMENT, 'Management'],
    [EngineeringTechnologyProgram.ENGINEERING_TECHNOLOGY, 'Engineering Technology'],
    [LawProgram.LAWS, 'Laws'],
    [MedicineAndLifeProgram.MEDICINE, 'Medicine'],
    [MedicineAndLifeProgram.BIOMEDICAL_SCIENCES, 'Biomedical Sciences'],
    [MedicineAndLifeProgram.NURSING_AND_MIDWIFERY, 'Nursing and Midwifery'],
    [MedicineAndLifeProgram.HEALTH_CARE_ENGINEERING, 'Health Case Engineering'],
    [RehabilitationSciencesProgram.REHABILITATION_SCIENCES, 'Rehabilitation Sciences'],
    [RehabilitationSciencesProgram.PHYSIOTHERAPY, 'Physiotherapy'],
    [SciencesProgram.BIOLOGY, 'Biology'],
    [SciencesProgram.CHEMISTRY, 'Chemistry'],
    [SciencesProgram.PHYSICS, 'Physics'],
    [SciencesProgram.COMPUTER_SCIENCE, 'Computer Science'],
    [SciencesProgram.MATHEMATICS, 'Mathematics'],
    [SciencesProgram.STATISTICS_AND_DATA_SCIENCE, 'Statistics'],
    [SciencesProgram.MATERIOMICS, 'Materiomics'],
    [SocialSciencesProgram.SOCIAL_SCIENCES, 'Social Sciences'],
    [TransportationSciencesProgram.TRANSPORTATION_SCIENCES, 'Transportation Sciences']
  ]);

  public roles = [UserRole.STUDENT, UserRole.PHD, UserRole.PROFESSOR];
  public rolesTranslation = new Map<UserRole, string>([
    [UserRole.STUDENT, 'Student'],
    [UserRole.PHD, 'PhD student'],
    [UserRole.PROFESSOR, 'Professor']
  ]);

  public sendingDetails = false;
  public mobileDetailSteps: MobileDetailStep[] = [
    {page: 1, active: true},
    {page: 2, active: false}
  ];

  public constructor(private readonly authService: AuthService, private readonly router: Router) {}

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

  public sendDetails(): void {
    if (this.detailsForm.valid) {
      this.sendingDetails = true;

      this.authService
        .setUserDetails(
          this.detailsForm.value.firstName,
          this.detailsForm.value.lastName,
          this.detailsForm.value.faculty,
          this.detailsForm.value.program,
          this.detailsForm.value.universityId,
          this.detailsForm.value.yearOfGraduation,
          this.detailsForm.value.phoneNumber
        )
        .then(() => this.router.navigateByUrl('/'));
    }
  }

  public getActiveStepPageNumber(): number {
    return this.mobileDetailSteps.find((step: MobileDetailStep) => step.active).page;
  }

  public continueMobileDetails(): void {
    this.detailsForm.markAllAsTouched();

    if (this.detailsForm.valid && !this.sendingDetails) {
      const currentActiveStepPageNumber = this.getActiveStepPageNumber();
      if (currentActiveStepPageNumber === this.mobileDetailSteps.length) {
        this.sendingDetails = true;
        this.sendDetails();
      } else {
        this.mobileDetailSteps[currentActiveStepPageNumber - 1].active = false;
        this.mobileDetailSteps[currentActiveStepPageNumber].active = true;

        this.detailsForm.controls.universityId.addValidators(Validators.required);
        this.detailsForm.controls.role.addValidators(Validators.required);

        this.detailsForm.markAsUntouched();
      }
    }
  }
}

interface MobileDetailStep {
  page: number;
  active: boolean;
}
