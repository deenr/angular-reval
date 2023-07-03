import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';

export interface SphienceUser {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  faculty: Faculty;
  program: Program;
  universityId: string;
  yearOfGraduation: string;
  setDetails: boolean;
}
