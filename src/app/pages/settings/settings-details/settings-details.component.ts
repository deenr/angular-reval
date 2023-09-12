import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {UserInfo} from '@shared/models/user/user-info';
import {RoleService} from '@shared/services/role/role.service';
import {AuthService} from '@shared/services/auth/auth.service';
import {HttpUserInfoService} from '@shared/services/user/http-user-info.service';

@Component({
  selector: 'app-settings-details',
  templateUrl: './settings-details.component.html',
  styleUrls: ['./settings-details.component.scss']
})
export class SettingsDetailsComponent {
  @Input() public isMobile: boolean;
  @Input() public detailsForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<UserRole>;
    faculty: FormControl<Faculty>;
    program: FormControl<Program>;
    universityId: FormControl<string>;
    yearOfGraduation: FormControl<number>;
  }>;
  @Input() public loadingUser: boolean;
  @Output() public userUpdated = new EventEmitter<UserInfo>();

  public faculties = Object.keys(Faculty).map((faculty: string) => faculty as Faculty);

  public roles = [UserRole.STUDENT, UserRole.PHD, UserRole.PROFESSOR];

  public skeletonType = SkeletonType;
  public savingDetails = false;

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
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly userInfoService: HttpUserInfoService
  ) {}

  public getRoleTranslation(UserRole: UserRole): string {
    return this.rolesTranslation.get(UserRole);
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
    if (Object.values(Faculty).includes(faculty)) {
      this.detailsForm.controls.program.setValue(null);
      this.detailsForm.controls.program.enable();
    } else {
      console.log('hi');
      this.detailsForm.controls.program.disable();
    }
  }

  public saveDetails(): void {
    this.detailsForm.markAllAsTouched();

    if (this.detailsForm.valid) {
      this.savingDetails = true;
      if (this.roleService.getCurrentRole() === UserRole.INCOMPLETE_PROFILE) {
        const userToSave = this.getUserToSave(this.route.snapshot.paramMap.get('id'));
        this.authService
          .setUserInfo(userToSave)
          .then(() => {
            this.savingDetails = false;
            this.userUpdated.emit(userToSave);
          })
          .catch(() => {});
      } else {
        const currentUser = JSON.parse(localStorage.getItem('user')) as {id: string};
        const userToSave = this.getUserToSave(currentUser.id);
        this.userInfoService.updateUserProfile(userToSave).subscribe(() => {
          this.savingDetails = false;
          this.userUpdated.emit(userToSave);
        });
      }
    }
  }

  private getUserToSave(id: string): UserInfo {
    console.log(
      new UserInfo(
        id,
        this.detailsForm.value.firstName,
        this.detailsForm.value.lastName,
        this.detailsForm.value.phoneNumber,
        this.detailsForm.value.email,
        this.detailsForm.value.faculty,
        this.detailsForm.value.program,
        this.detailsForm.value.universityId,
        this.detailsForm.value.yearOfGraduation,
        this.detailsForm.value.role
      )
    );
    return new UserInfo(
      id,
      this.detailsForm.value.firstName,
      this.detailsForm.value.lastName,
      this.detailsForm.value.phoneNumber,
      this.detailsForm.value.email,
      this.detailsForm.value.faculty,
      this.detailsForm.value.program,
      this.detailsForm.value.universityId,
      this.detailsForm.value.yearOfGraduation,
      this.detailsForm.value.role
    );
  }
}
