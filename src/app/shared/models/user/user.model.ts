import { UserRole } from '@shared/enums/user/user-role.enum';
import { UserStatus } from '@shared/enums/user/user-status.enum';
import { UserOverview } from './user-overview.model';

export class User extends UserOverview {
  private _phoneNumber: string;

  public constructor(id: string, firstName: string, lastName: string, email: string, role: UserRole, status: UserStatus, joined: Date, phoneNumber: string) {
    super(id, firstName, lastName, email, role, status, joined);

    this._phoneNumber = phoneNumber;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  public toJSON(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      status: this.status,
      joined: this.joined,
      phoneNumber: this.phoneNumber
    };
  }

  public static fromJSON(json: any): User {
    const id = json.id;
    const firstName = json.firstName;
    const lastName = json.lastName;
    const email = json.email;
    const role = json.role;
    const status = json.status;
    const joined = json.joined;
    const phoneNumber = json.phoneNumber;

    return new User(id, firstName, lastName, email, status, role, joined, phoneNumber);
  }
}
