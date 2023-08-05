import {inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CanActivateFn, Router} from '@angular/router';
import {DialogType} from '@custom-components/dialogs/dialog-type.enum';
import {StackedLeftDialogComponent} from '@custom-components/dialogs/stacked-left-dialog/stacked-left-dialog.component';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {RoleService} from '@shared/services/role/role.service';
import {SupabaseService} from '@shared/services/supabase/supabase.service';
import {AuthSession} from '@supabase/supabase-js';
import {map, catchError, of} from 'rxjs';

export const canActivateInterface: CanActivateFn = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);
  const roleService = inject(RoleService);
  const dialog = inject(MatDialog);

  return supabaseService.getCurrentSession().pipe(
    map((session: AuthSession) => {
      console.log(session);
      if (session === null || session === undefined) {
        router.navigate(['/login']);
        return false;
      } else if (roleService.getCurrentRole() !== UserRole.ADMIN) {
        dialog.open(StackedLeftDialogComponent, {
          width: '400px',
          data: {
            type: DialogType.WARNING,
            icon: 'lock',
            title: 'Dashboard is not available yet',
            description: 'Our team is diligently working towards making our incredible dashboard available to you.'
          }
        });

        supabaseService.signOut();
        router.navigate(['/']);
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
