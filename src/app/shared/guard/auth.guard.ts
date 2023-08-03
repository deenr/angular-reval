import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SupabaseService} from '@shared/services/supabase/supabase.service';
import {AuthSession} from '@supabase/supabase-js';
import {map, catchError, of} from 'rxjs';

export const canActivateApp: CanActivateFn = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return supabaseService.getCurrentSession().pipe(
    map((session: AuthSession | boolean) => {
      if (session === null || session === undefined || !session) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
