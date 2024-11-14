import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';
import { AUTHENTICATION } from '@core/services/api/authentication/authentication.interface';
import { USERS } from '@core/services/api/users/users.interface';
import { AuthSession } from '@supabase/supabase-js';
import { of, skipWhile, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authentication = inject(AUTHENTICATION);
  const usersService = inject(USERS);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  return authentication.getCurrentSession().pipe(
    skipWhile((session: AuthSession | boolean) => session === null || session === undefined),
    switchMap((session: AuthSession | boolean) => {
      if (session === null || session === undefined || !session) {
        router.navigate(['/login']);
        return of(false);
      }

      return of(true);
      // return usersService.getById((session as AuthSession).user.id).pipe(
      //   map(({ status }) => {
      //     if (status === UserStatus.DENIED || status === UserStatus.PENDING) {
      //       dialog.open(StackedLeftDialogComponent, {
      //         width: '400px',
      //         data: {
      //           type: DialogType.WARNING,
      //           icon: 'lock',
      //           title: 'Dashboard is not available yet',
      //           description: 'Our team is diligently working towards making our incredible dashboard available to you.'
      //         }
      //       });

      //       authentication.signOut();
      //       router.navigate(['/']);
      //       return false;
      //     }

      //     return true;
      //   }),
      //   catchError(() => {
      //     router.navigate(['/login']);
      //     return of(false);
      //   })
      // );
    })
  );
};
