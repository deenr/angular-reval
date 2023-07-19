import {Injectable} from '@angular/core';
import {UserRole} from '@shared/enums/user/user-role.enum';
import {SphienceUser} from '@shared/interfaces/user/sphience-user';
import {
  AuthChangeEvent,
  AuthError,
  AuthOtpResponse,
  AuthResponse,
  AuthSession,
  AuthTokenResponse,
  OAuthResponse,
  ResendParams,
  Session,
  Subscription,
  SupabaseClient,
  User,
  VerifyEmailOtpParams,
  createClient
} from '@supabase/supabase-js';
import {Observable, from} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _session: AuthSession;

  public get session(): AuthSession {
    return this._session;
  }

  private set session(session: AuthSession) {
    this._session = session;
  }

  public supabase: SupabaseClient;

  public constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.getSession().then(({data}) => {
      this.session = data.session;
    });
  }

  public profile(user: User) {
    return this.supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): {data: {subscription: Subscription}} {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  public signIn(email: string, password: string): Promise<[user: {id: string; role: UserRole}, error: AuthError]> {
    return new Promise<[user: {id: string; role: UserRole}, error: AuthError]>((resolve, reject) => {
      this.supabase.auth.signInWithPassword({email, password}).then(({data, error}: AuthTokenResponse) => {
        if (data) {
          this.getUserRole(data.user.id).subscribe((userRole: UserRole) => {
            localStorage.setItem('role', JSON.stringify({id: data.user.id, role: userRole}));
            resolve([{id: data.user.id, role: userRole}, null]);
          });
        } else {
          reject([null, error]);
        }
      });
    });
  }

  public setUserInformation(user: SphienceUser): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const updateUserProfile = this.supabase
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
          .eq('id', user.id);
        const updateUserRole = this.supabase.from('user_roles').update({role: user.role}).eq('user_id', user.id);

        await Promise.all([updateUserProfile, updateUserRole]);

        localStorage.setItem('role', JSON.stringify({id: user.id, role: user.role}));
        resolve(null);
      } catch (error) {
        console.error('Transaction failed:', error);
        await this.supabase.rpc('rollback');
        console.log('Transaction rolled back');
        reject(error);
      }
    });
  }

  public googleSignIn(): Promise<OAuthResponse> {
    return this.supabase.auth.signInWithOAuth({provider: 'google', options: {redirectTo: 'http://localhost:4200/register'}});
  }

  public signUp(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({email, password});
  }

  public signOut(): Promise<{error: AuthError}> {
    return this.supabase.auth.signOut();
  }

  public verifyEmail(token: string, email: string): Promise<AuthResponse> {
    const params = {token, email, type: 'email'} as VerifyEmailOtpParams;
    return this.supabase.auth.verifyOtp(params);
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
  public resendEmailVerification(email: string): Promise<AuthOtpResponse> {
    const params = {email, type: 'signup'} as ResendParams;
    return this.supabase.auth.resend(params);
  }
}
