import { UserRole } from '@shared/enums/user/user-role.enum';
import { UserStatus } from '@shared/enums/user/user-status.enum';
import { User } from './user.model';

export class UserOverview {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _role: UserRole;
  private _status: UserStatus;
  private _joined: Date;

  public constructor(id: string, firstName: string, lastName: string, email: string, role: UserRole, status: UserStatus, joined: Date) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._role = role;
    this._status = status;
    this._joined = joined;
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

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get status(): UserStatus {
    return this._status;
  }

  public set status(status: UserStatus) {
    this._status = status;
  }

  public get joined(): Date {
    return this._joined;
  }

  public set joined(joined: Date) {
    this._joined = joined;
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
      email: this.email,
      role: this.role,
      status: this.status,
      joined: this.joined
    };
  }

  public static fromJSON(json: any): UserOverview {
    const id = json.id;
    const firstName = json.firstName;
    const lastName = json.lastName;
    const email = json.email;
    const role = json.role;
    const status = json.status;
    const joined = json.joined;

    return new UserOverview(id, firstName, lastName, email, role, status, joined);
  }

  public static fromUser(user: User): UserOverview {
    return new UserOverview(user.id, user.firstName, user.lastName, user.email, user.role, user.status, user.joined);
  }
}
