import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {SupabaseService} from '../supabase/supabase.service';
import {Observable, from} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {
  public constructor(private readonly supabaseService: SupabaseService) {}

  public getUserDetailsById(id: string): Observable<SphienceUser> {
    return from(
      this.supabaseService.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
        .then(({data}) => data as SphienceUser)
    );
  }
}
