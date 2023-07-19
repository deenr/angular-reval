import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {UserRole} from '@shared/enums/user/user-role.enum';

export interface SphienceUser {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  faculty: Faculty;
  program: Program;
  universityId: string;
  yearOfGraduation: string;
  role?: UserRole;
}
