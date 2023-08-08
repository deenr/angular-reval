import {Faculty} from '@shared/enums/faculty-and-department/faculty.enum';
import {Program} from '@shared/enums/faculty-and-department/program.type';
import {UserRole} from '@shared/enums/user/user-role.enum';

export class SphienceUser {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;
  private _email: string;
  private _faculty: Faculty;
  private _program: Program;
  private _universityId: string;
  private _yearOfGraduation: string;
  private _role: UserRole;

  public constructor(
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    faculty: Faculty,
    program: Program,
    universityId: string,
    yearOfGraduation: string,
    role: UserRole
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phoneNumber = phoneNumber;
    this._email = email;
    this._faculty = faculty;
    this._program = program;
    this._universityId = universityId;
    this._yearOfGraduation = yearOfGraduation;
    this._role = role;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(firstName: string) {
    this._firstName = firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(lastName: string) {
    this._lastName = lastName;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
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

  public get universityId(): string {
    return this._universityId;
  }

  public set universityId(universityId: string) {
    this._universityId = universityId;
  }

  public get yearOfGraduation(): string {
    return this._yearOfGraduation;
  }

  public set yearOfGraduation(yearOfGraduation: string) {
    this._yearOfGraduation = yearOfGraduation;
  }

  public get role(): UserRole {
    return this._role;
  }

  public set role(role: UserRole) {
    this._role = role;
  }

  public toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      faculty: this.faculty,
      program: this.program,
      universityId: this.universityId,
      yearOfGraduation: this.yearOfGraduation,
      role: this.role
    };
  }

  public static fromJSON(json: any): SphienceUser {
    const id = json.id;
    const firstName = json.firstName;
    const lastName = json.lastName;
    const phoneNumber = json.phoneNumber;
    const email = json.email;
    const faculty = json.faculty;
    const program = json.program;
    const universityId = json.universityId;
    const yearOfGraduation = json.yearOfGraduation;
    const role = json.role;

    return new SphienceUser(id, firstName, lastName, phoneNumber, email, faculty, program, universityId, yearOfGraduation, role);
  }
}
