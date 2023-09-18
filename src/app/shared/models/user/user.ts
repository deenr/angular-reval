import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {UserOverview} from './user-overview';

export class User extends UserOverview {
  private _phoneNumber: string;
  private _faculty: Faculty;
  private _program: Program;
  private _yearOfGraduation: number;

  public constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    universityId: string,
    role: UserRole,
    joined: Date,
    phoneNumber: string,
    faculty: Faculty,
    program: Program,
    yearOfGraduation: number
  ) {
    super(id, firstName, lastName, email, universityId, role, joined);

    this._phoneNumber = phoneNumber;
    this._faculty = faculty;
    this._program = program;
    this._yearOfGraduation = yearOfGraduation;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public get faculty(): Faculty {
    return this._faculty;
  }

  public set faculty(faculty: Faculty) {
    this._faculty = faculty;
  }

  public get program(): Program {
    return this._program;
  }

  public set program(program: Program) {
    this._program = program;
  }

  public get yearOfGraduation(): number {
    return this._yearOfGraduation;
  }

  public set yearOfGraduation(yearOfGraduation: number) {
    this._yearOfGraduation = yearOfGraduation;
  }

  public toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      universityId: this.universityId,
      role: this.role,
      joined: this.joined,
      phoneNumber: this.phoneNumber,
      faculty: this.faculty,
      program: this.program,
      yearOfGraduation: this.yearOfGraduation
    };
  }

  public static fromJSON(json: any): User {
    const id = json.id;
    const firstName = json.firstName;
    const lastName = json.lastName;
    const email = json.email;
    const universityId = json.universityId;
    const role = json.role;
    const joined = json.joined;
    const phoneNumber = json.phoneNumber;
    const faculty = json.faculty;
    const program = json.program;
    const yearOfGraduation = json.yearOfGraduation;

    return new User(id, firstName, lastName, email, universityId, role, joined, phoneNumber, faculty, program, yearOfGraduation);
  }
}
