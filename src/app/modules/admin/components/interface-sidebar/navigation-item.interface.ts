import { UserRole } from '@shared/models/user/enums/user-role.enum';

export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  routerLink?: string;
  permissions: UserRole[];
}
