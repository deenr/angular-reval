import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {SupabaseService} from '../supabase/supabase.service';
import {Observable, from, of} from 'rxjs';
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

  public getUserDetailsById(id: string): Observable<SphienceUser> {
    return from(
      this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => data as SphienceUser)
    );
  }

  public updateUserProfile(user: SphienceUser): Observable<void> {
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
