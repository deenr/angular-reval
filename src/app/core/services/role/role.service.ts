import { Injectable } from '@angular/core';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public constructor(private readonly localStorageService: LocalStorageService) {}

  public getCurrentRole(): UserRole {
    return (JSON.parse(this.localStorageService.getItem('user')) as { id: string; role: UserRole })?.role;
  }
}
