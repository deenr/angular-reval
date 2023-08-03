import {inject} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {SupabaseService} from '@shared/services/supabase/supabase.service';
import {AuthSession} from '@supabase/supabase-js';
import {map, catchError, of} from 'rxjs';

export const canActivateApp: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return supabaseService.getCurrentSession().pipe(
    map((session: AuthSession | boolean) => {
      if (!session) {
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
