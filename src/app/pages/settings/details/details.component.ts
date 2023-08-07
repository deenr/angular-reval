import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {SkeletonType} from '@shared/directives/skeleton/skeleton-type.enum';
import {ArchitectureAndArtsProgram} from '@shared/enums/faculty-and-department/architecture-and-arts-program.enum';
import {BusinessProgram} from '@shared/enums/faculty-and-department/business-program.enum';
import {EngineeringTechnologyProgram} from '@shared/enums/faculty-and-department/engineering-technology-program.enum';
import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {LawProgram} from '@shared/enums/faculty-and-department/law-program.enum';
import {MedicineAndLifeProgram} from '@shared/enums/faculty-and-department/medicine-and-life-program.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {RehabilitationSciencesProgram} from '@shared/enums/faculty-and-department/rehabilitation-sciences-program.enum';
import {SciencesProgram} from '@shared/enums/faculty-and-department/sciences-program.enum';
import {SocialSciencesProgram} from '@shared/enums/faculty-and-department/social-sciences-program.enum';
import {TransportationSciencesProgram} from '@shared/enums/faculty-and-department/transportation-sciences-program.enum';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {RoleService} from '@shared/services/role/role.service';
import {SupabaseService} from '@shared/services/supabase/supabase.service';
import {HttpUserService} from '@shared/services/user/http-user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public desktopDetailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<UserRole>;
    faculty: FormControl<Faculty>;
    program: FormControl<Program>;
    universityId: FormControl<string>;
    yearOfGraduation: FormControl<string>;
  }> = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl({value: null, disabled: true}),
    role: new FormControl(null, Validators.required),
    faculty: new FormControl(null),
    program: new FormControl({value: null, disabled: true}),
    universityId: new FormControl(null, Validators.required),
    yearOfGraduation: new FormControl(null)
  });

  public faculties = Object.keys(Faculty).map((faculty: string) => faculty as Faculty);

  public roles = [UserRole.STUDENT, UserRole.PHD, UserRole.PROFESSOR];

  public skeletonType = SkeletonType;
  public savingDetails = false;
  public loadingUser = true;

  private facultiesTranslation = new Map<Faculty, string>([
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

  private programTranslations = new Map<Program, string>([
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

  private rolesTranslation = new Map<UserRole, string>([
    [UserRole.STUDENT, 'Student'],
    [UserRole.PHD, 'PhD student'],
    [UserRole.PROFESSOR, 'Professor']
  ]);

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly supabaseService: SupabaseService,
    private readonly roleService: RoleService,
    private readonly httpUserService: HttpUserService
  ) {}

  public ngOnInit(): void {
    const localUserIdAndEmail = JSON.parse(localStorage.getItem('user')) as {id: string; email: string};
    if (this.route.snapshot.paramMap.get('id') && this.roleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
      this.desktopDetailsForm.controls.email.setValue(localUserIdAndEmail.email);
      this.loadingUser = false;
    } else {
      this.httpUserService.getUserDetailsById(localUserIdAndEmail.id).subscribe((user: SphienceUser) => {
        this.setSettingsDetailsForm(user);
        this.loadingUser = false;
      });
    }
  }

  public getRoleTranslation(UserRole: UserRole): string {
    return this.rolesTranslation.get(UserRole);
  }

  public getFacultyTranslation(faculty: Faculty): string {
    return this.facultiesTranslation.get(faculty);
  }

  public getPrograms(): Program[] {
    switch (this.desktopDetailsForm.value.faculty) {
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
      this.desktopDetailsForm.controls.program.setValue(null);
      this.desktopDetailsForm.controls.program.enable();
    } else {
      console.log('hi');
      this.desktopDetailsForm.controls.program.disable();
    }
  }

  public saveDetails(): void {
    this.desktopDetailsForm.markAllAsTouched();

    if (this.desktopDetailsForm.valid) {
      this.savingDetails = true;

      if (this.roleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
        this.supabaseService
          .setUserInformation(this.getUserToSave(this.route.snapshot.paramMap.get('id')))
          .then(() => {
            this.savingDetails = false;
          })
          .catch(() => {});
      } else {
        const currentUser = JSON.parse(localStorage.getItem('user')) as {id: string};
        this.httpUserService.updateUserProfile(this.getUserToSave(currentUser.id)).subscribe(() => {
          this.savingDetails = false;
        });
      }
    }
  }

  private getUserToSave(id: string): SphienceUser {
    return {
      id,
      firstName: this.desktopDetailsForm.value.firstName,
      lastName: this.desktopDetailsForm.value.lastName,
      phoneNumber: this.desktopDetailsForm.value.phoneNumber,
      email: this.desktopDetailsForm.value.email,
      faculty: this.desktopDetailsForm.value.faculty,
      program: this.desktopDetailsForm.value.program,
      universityId: this.desktopDetailsForm.value.universityId,
      yearOfGraduation: this.desktopDetailsForm.value.yearOfGraduation,
      role: this.desktopDetailsForm.value.role
    } as SphienceUser;
  }

  private setSettingsDetailsForm(user: SphienceUser): void {
    this.desktopDetailsForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: this.roleService.getCurrentRole(),
      faculty: user.faculty,
      program: user.program,
      universityId: user.universityId,
      yearOfGraduation: user.yearOfGraduation
    });

    this.desktopDetailsForm.controls.role.setValue(this.roleService.getCurrentRole());

    this.desktopDetailsForm.controls.email.disable();
    this.desktopDetailsForm.controls.role.disable();
    if (user.faculty) {
      this.desktopDetailsForm.controls.program.enable();
    }
    this.desktopDetailsForm.controls.universityId.disable();
  }
}
