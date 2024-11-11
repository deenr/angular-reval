import { UserRole } from '@shared/enums/user/user-role.enum';

export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  routerLink?: string;
  permissions: UserRole[];
}
