import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {UserRole} from '@shared/enums/user/user-role.enum';
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
import {ActivatedRoute, Router} from '@angular/router';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {SupabaseService} from '@shared/services/supabase/supabase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public desktopDetailsForm: FormGroup<{
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
    universityId: new FormControl(null, Validators.required),
    yearOfGraduation: new FormControl(null),
    role: new FormControl(null, Validators.required)
  });

  public mobileDetailsForm: FormGroup<{
    personal: FormGroup<{
      firstName: FormControl<string>;
      lastName: FormControl<string>;
      phoneNumber: FormControl<string>;
    }>;
    university: FormGroup<{
      faculty: FormControl<Faculty>;
      program: FormControl<Program>;
      universityId: FormControl<string>;
      yearOfGraduation: FormControl<string>;
      role: FormControl<UserRole>;
    }>;
  }> = new FormGroup({
    personal: new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')])
    }),
    university: new FormGroup({
      faculty: new FormControl(null),
      program: new FormControl({value: null, disabled: true}),
      universityId: new FormControl(null, Validators.required),
      yearOfGraduation: new FormControl(null),
      role: new FormControl(null, Validators.required)
    })
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
    {page: MobileDetailForm.PERSONAL, active: true},
    {page: MobileDetailForm.UNIVERISTY, active: false}
  ];
  private mobileDetailFormPageNumber = new Map<MobileDetailForm, number>([
    [MobileDetailForm.PERSONAL, 1],
    [MobileDetailForm.UNIVERISTY, 2]
  ]);

  public loadingUserRole = true;
  public skeletonType = SkeletonType;

  public constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly supabaseService: SupabaseService) {}

  public ngOnInit(): void {
    this.supabaseService.getUserRole(this.route.snapshot.paramMap.get('id')).subscribe((userRole: UserRole) => {
      if (userRole) {
        this.loadingUserRole = false;
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  public getRoleTranslation(UserRole: UserRole): string {
    return this.rolesTranslation.get(UserRole);
  }

  public getFacultyTranslation(faculty: Faculty): string {
    return this.facultiesTranslation.get(faculty);
  }

  public getPrograms(): Program[] {
    switch (this.desktopDetailsForm.value.faculty || this.mobileDetailsForm.controls.university.value.faculty) {
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
    if (Object.values(Faculty).includes(faculty)) {
      this.desktopDetailsForm.controls.program.enable();
      this.mobileDetailsForm.controls.university.controls.program.enable();
    } else {
      this.desktopDetailsForm.controls.program.disable();
      this.mobileDetailsForm.controls.university.controls.program.disable();
    }
  }

  public sendingDesktopDetails(): void {
    this.desktopDetailsForm.markAllAsTouched();

    if (this.desktopDetailsForm.valid) {
      this.sendingDetails = true;
    }
  }

  public getActiveStepPage(): MobileDetailForm {
    return this.mobileDetailSteps.find((step: MobileDetailStep) => step.active).page;
  }

  public getActiveStepPageNumber(): number {
    return this.mobileDetailFormPageNumber.get(this.getActiveStepPage());
  }

  public isMobileStepPersonal(): boolean {
    return this.getActiveStepPage() === MobileDetailForm.PERSONAL;
  }

  public isMobileStepUniversity(): boolean {
    return this.getActiveStepPage() === MobileDetailForm.UNIVERISTY;
  }

  public continueMobileDetails(): void {
    const activePageNumber = this.getActiveStepPageNumber() - 1;

    if (!this.sendingDetails) {
      if (this.getActiveStepPage() === MobileDetailForm.PERSONAL) {
        this.mobileDetailsForm.controls.personal.markAllAsTouched();
        if (this.mobileDetailsForm.controls.personal.valid) {
          this.mobileDetailSteps[activePageNumber].active = false;
          this.mobileDetailSteps[activePageNumber + 1].active = true;
        }
      } else if (this.getActiveStepPage() === MobileDetailForm.UNIVERISTY) {
        this.mobileDetailsForm.controls.university.markAllAsTouched();
        if (this.mobileDetailsForm.controls.university.valid) {
          this.sendingDetails = true;
        }
      }
    }
  }
}

interface MobileDetailStep {
  page: MobileDetailForm;
  active: boolean;
}

enum MobileDetailForm {
  PERSONAL = 'PERSONAL',
  UNIVERISTY = 'UNIVERISTY'
}
