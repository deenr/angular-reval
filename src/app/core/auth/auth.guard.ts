import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { RoleService } from '@core/services/role/role.service';
import { AuthSession } from '@supabase/supabase-js';
import { catchError, map, of, skipWhile } from 'rxjs';

export const canActivateInterface: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const roleService = inject(RoleService);
  const dialog = inject(MatDialog);

  return authService.getCurrentSession().pipe(
    skipWhile((session: AuthSession | boolean) => session === null || session === undefined),
    map((session: AuthSession | boolean) => {
      if (session === null || session === undefined || !session) {
        router.navigate(['/login']);
        return false;
      }
      // else if (roleService.getCurrentRole() !== UserRole.ADMIN) {
      //   dialog.open(StackedLeftDialogComponent, {
      //     width: '400px',
      //     data: {
      //       type: DialogType.WARNING,
      //       icon: 'lock',
      //       title: 'Dashboard is not available yet',
      //       description: 'Our team is diligently working towards making our incredible dashboard available to you.'
      //     }
      //   });

      //   authService.signOut();
      //   router.navigate(['/']);
      //   return false;
      // }

      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
