import { Injectable, signal } from '@angular/core';
import { UserRole } from '@shared/models/user/enums/user-role.enum';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private readonly userRoleSignal = signal<UserRole>(this.localStorageService.getItem(LocalStorageService.USER_ROLE) as UserRole);

  public constructor(private readonly localStorageService: LocalStorageService) {}

  public getCurrentRole(): UserRole {
    return this.userRoleSignal();
  }
}
