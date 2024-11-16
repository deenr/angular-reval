import { Inject, Injectable } from '@angular/core';
import { AuthChangeEvent, AuthOtpResponse, AuthResponse, AuthSession, PostgrestSingleResponse, ResendParams, VerifyEmailOtpParams } from '@supabase/supabase-js';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { UserStatus } from '@shared/models/user/enums/user-status.enum';
import { LocalStorageService } from '../../local-storage.service';
import { SupabaseService } from '../supabase.service';
import { Users, USERS } from '../users/users.interface';
import { Authentication } from './authentication.interface';

export enum ChangePasswordResponse {
  PASSWORD_EMPTY = 'PASSWORD_EMPTY',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_IDENTICAL = 'PASSWORD_IDENTICAL',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED'
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthenticationService extends SupabaseService implements Authentication {
  private _currentSession = new BehaviorSubject<AuthSession | boolean | null>(null);

  public constructor(@Inject(USERS) private readonly usersService: Users, private readonly localStorageService: LocalStorageService) {
    super();

    this.initializeAuth();
  }

  public getCurrentSession(): Observable<AuthSession | boolean | null> {
    return this._currentSession.asObservable();
  }

  public signIn(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabase.auth.signInWithPassword({ email, password })).pipe(
      map((response) => {
        if (response.error) throw response.error;
        return response;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  public signUp(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabase.auth.signUp({ email, password })).pipe(
      map((response) => {
        if (response.error) throw response.error;
        return response;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  public signOut(): Observable<void> {
    return from(this.supabase.auth.signOut()).pipe(
      tap(() => {
        this.localStorageService.removeItem('user');
      }),
      map(({ error }) => {
        if (error) throw error;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  public checkDuplicateAccount(email: string): Observable<boolean> {
    return from(this.supabase.from('users').select().eq('email', email)).pipe(
      map(({ data }) => data.length > 0),
      catchError((error) => throwError(() => error))
    );
  }

  public verifyEmail(token: string, email: string): Observable<AuthResponse> {
    const params: VerifyEmailOtpParams = {
      token,
      email,
      type: 'email'
    };
    return from(this.supabase.auth.verifyOtp(params)).pipe(catchError((error) => throwError(() => error)));
  }

  public resendEmailVerification(email: string): Observable<AuthOtpResponse> {
    const params: ResendParams = {
      email,
      type: 'signup'
    };
    return from(this.supabase.auth.resend(params)).pipe(catchError((error) => throwError(() => error)));
  }

  public updateUserPassword(currentPassword: string, newPassword: string): Observable<ChangePasswordResponse> {
    return from(
      this.supabase.rpc('change_user_password', {
        current_plain_password: currentPassword,
        new_plain_password: newPassword
      })
    ).pipe(
      map((response: PostgrestSingleResponse<any>) => {
        if (response.error) throw response.error.message as ChangePasswordResponse;
        return response.data?.data as ChangePasswordResponse;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  private initializeAuth(): void {
    from(this.supabase.auth.getSession())
      .pipe(
        take(1),
        switchMap(({ data }) => {
          if (data.session) {
            return this.usersService.getById(data.session.user.id).pipe(
              map(({ id, role, status }) => {
                if (status === UserStatus.APPROVED) {
                  this._currentSession.next(data.session);
                  this.localStorageService.setItem(LocalStorageService.USER_ID, id);
                  this.localStorageService.setItem(LocalStorageService.USER_ROLE, role);
                } else {
                  this._currentSession.next(false);
                  this.localStorageService.removeItem(LocalStorageService.USER_ID);
                  this.localStorageService.removeItem(LocalStorageService.USER_ROLE);
                }
              })
            );
          } else {
            this._currentSession.next(false);
            this.localStorageService.removeItem(LocalStorageService.USER_ID);
            this.localStorageService.removeItem(LocalStorageService.USER_ROLE);
            return of(null);
          }
        })
      )
      .subscribe();

    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: AuthSession) => {
      this._currentSession.next(event === 'SIGNED_IN' ? session : null);
    });
  }
}
