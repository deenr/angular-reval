import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export interface UserUnsensitive {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserOverview {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: Date;
}

export interface User extends UserOverview {
  phoneNumber: string;
}
