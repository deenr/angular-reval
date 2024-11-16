import { InjectionToken } from '@angular/core';
import { AuthOtpResponse, AuthResponse, AuthSession } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { ChangePasswordResponse } from './supabase-authentication.service';

export const AUTHENTICATION = new InjectionToken<Authentication>('Authentication');

export interface Authentication {
  getCurrentSession(): Observable<AuthSession | boolean | null>;
  signIn(email: string, password: string): Observable<AuthResponse>;
  signUp(email: string, password: string): Observable<AuthResponse>;
  signOut(): Observable<void>;
  checkDuplicateAccount(email: string): Observable<boolean>;
  verifyEmail(token: string, email: string): Observable<AuthResponse>;
  resendEmailVerification(email: string): Observable<AuthOtpResponse>;
  updateUserPassword(currentPassword: string, newPassword: string): Observable<ChangePasswordResponse>;
}
