import {Observable, from, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {User} from '@shared/models/user/user';
import {StubUser} from '@shared/models/user/stub-user';
import {UserOverview} from '@shared/models/user/user-overview';

@Injectable({
  providedIn: 'root'
})
export class StubUserService {
  public users = StubUser.createAmountOfUsers(100);

  public getUsers(): Observable<User[]> {
    return of(this.users);
  }

  public getUsersOverview(): Observable<UserOverview[]> {
    return of(this.users.map((user: User) => UserOverview.fromUser(user)));
  }

  public getUserById(id: string): Observable<User> {
    return of(this.users.find((user: User) => user.id === id));
  }

  public updateUserInfo(updatedUser: User): Observable<void> {
    this.users = this.users.map((user: User) => (user.id === updatedUser.id ? updatedUser : user));

    return of();
  }

  public getUserRole(id: string): Observable<UserRole> {
    return of(this.users.find((user: User) => user.id === id).role);
  }
}
