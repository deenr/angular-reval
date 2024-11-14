export interface UserUnsensitiveDTO {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserOverviewDTO extends UserUnsensitiveDTO {
  email: string;
  joined: Date;
  users_role_status: {
    role: string;
    status: string;
  }[];
}

export interface UserDTO extends UserOverviewDTO {
  phoneNumber: string;
}
