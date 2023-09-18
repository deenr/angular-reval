import {User} from '@shared/models/user/user';
import {Observable, from} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {SupabaseClient, createClient} from '@supabase/supabase-js';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  private supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  public getUsersInfo(): Observable<User[]> {
    return from(
      this.supabase
        .from('users')
        .select('*')
        .then(({data}) => data?.map((userInfoJSON: any) => User.fromJSON(userInfoJSON)))
    );
  }

  public getUserInfoById(id: string): Observable<User> {
    return from(
      this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => User.fromJSON(data))
    );
  }

  public updateUserInfo(user: User): Observable<void> {
    return new Observable<void>((observer) => {
      this.supabase
        .from('users')
        .update({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          faculty: user.faculty,
          program: user.program,
          universityId: user.universityId,
          yearOfGraduation: user.yearOfGraduation
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

  public getUserRole(userId: string): Observable<UserRole> {
    return from(
      this.supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then(({data}) => data?.role)
    );
  }
}
