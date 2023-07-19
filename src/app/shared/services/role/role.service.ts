import {Injectable} from '@angular/core';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {SphienceUser} from '@shared/interfaces/user/sphience-user';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor() {}

  public getCurrentRole(): UserRole {
    return (JSON.parse(localStorage.getItem('role')) as {id: string; role: UserRole}).role;
  }
}
