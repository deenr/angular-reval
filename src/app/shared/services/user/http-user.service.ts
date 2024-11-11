import { Injectable } from '@angular/core';
import { UserRole } from '@shared/enums/user/user-role.enum';
import { UserStatus } from '@shared/enums/user/user-status.enum';
import { UserOverview } from '@shared/models/user/user-overview.model';
import { User } from '@shared/models/user/user.model';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY']);
  }

  public getAll(): Observable<User[]> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          *,
          user_roles(role)
        `
        )
        .then(({ data }) => {
          return data?.map((userJSON: any) => {
            const flattenedUser = {
              ...userJSON,
              role: userJSON.user_roles?.map((roleObj: any) => roleObj.role)[0]
            };

            return User.fromJSON(flattenedUser);
          });
        })
    );
  }

  public getOverview(): Observable<UserOverview[]> {
    return from(
      this.supabase
        .from('users')
        .select(
          `
          *,
          users_role_status(status,role)
        `
        )
        .then(({ data }) => {
          return data?.map((userJSON: any) => {
            const { role, status } = userJSON.users_role_status[0];
            const flattenedUser = {
              ...userJSON,
              role,
              status
            };

            return UserOverview.fromJSON(flattenedUser);
          });
        })
    );
  }

  public getUsersInfo(): Observable<User[]> {
    return from(
      this.supabase
        .from('users')
        .select('*')
        .then(({ data }) => data?.map((userInfoJSON: any) => User.fromJSON(userInfoJSON)))
    );
  }

  public getUserInfoById(id: string): Observable<User> {
    return from(
      this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => User.fromJSON(data))
    );
  }

  public updateUserInfo(user: User): Observable<void> {
    return new Observable<void>((observer) => {
      this.supabase
        .from('users')
        .update({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          status: user.status,
          phoneNumber: user.phoneNumber
        })
        .eq('id', user.id)
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(); // Emit a value (void) to indicate success
            observer.complete(); // Complete the observable
          }
        });
    });
  }

  public getUserStatus(userId: string): Observable<UserStatus> {
    return from(
      this.supabase
        .from('users_role_status')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(({ data }) => data?.status)
    );
  }

  public getUserRole(userId: string): Observable<UserRole> {
    return from(
      this.supabase
        .from('users_role_status')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(({ data }) => data?.role)
    );
  }
}
