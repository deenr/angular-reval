import {inject} from '@angular/core';
import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn} from '@angular/router';
import {map, catchError, of} from 'rxjs';

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  return true;

  // return authService.isLoggedIn().pipe(
  //   map(() => true),
  //   catchError(() => {
  //     router.navigate(['route-to-fallback-page']);
  //     return of(false);
  //   })
  // );
};
