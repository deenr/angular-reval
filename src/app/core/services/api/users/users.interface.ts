import { InjectionToken } from '@angular/core';
import { User, UserOverview, UserUnsensitive } from '@shared/models/user/interfaces/user.interface';
import { Observable } from 'rxjs';

export const USERS = new InjectionToken<Users>('Users');

export interface Users {
  getAll(): Observable<User[]>;
  getAllUnsensitive(): Observable<UserUnsensitive[]>;
  getOverview(): Observable<UserOverview[]>;
  getById(id: string): Observable<User>;
  add(user: User): Observable<User>;
  update(user: Partial<User>): Observable<User>;
  delete(id: string): Observable<string>;
}
