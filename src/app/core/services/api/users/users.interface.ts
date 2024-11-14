import { InjectionToken } from '@angular/core';
import { User, UserOverview, UserUnsensitive } from '@shared/models/user/interfaces/user.interface';
import { Observable } from 'rxjs';

export const USERS = new InjectionToken<Users>('Users');

export interface Users {
  getAll(): Observable<User[]>;
  getAllUnsensitive(): Observable<UserUnsensitive[]>;
  getOverview(): Observable<UserOverview[]>;
  getById(id: string): Observable<User>;
  add(user: User): Observable<string>;
  update(user: Partial<User>): Observable<string>;
  delete(id: string): Observable<string>;
}
