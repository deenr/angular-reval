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
import {BehaviorSubject, Observable, Subject, forkJoin} from 'rxjs';
import {environment} from 'src/environments/environment';
import {HttpUserService} from '../user/http-user.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private _currentSession: BehaviorSubject<AuthSession> = new BehaviorSubject(null);
  public user: User | null = null;

  private supabase: SupabaseClient;

  public constructor(private readonly userService: HttpUserService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.supabase.auth.getSession().then((value: {data: {session: AuthSession}}) => {
      this._currentSession.next(value.data?.session ? value.data.session : null);
    });

    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: AuthSession) => {
      this._currentSession.next(event === 'SIGNED_IN' ? session : null);
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
        if (error) {
          reject([null, error]);
        } else if (data) {
          forkJoin([this.userService.getUserRole(data.user.id), this.userService.getUserDetailsById(data.user.id)]).subscribe(([userRole, user]: [UserRole, SphienceUser]) => {
            localStorage.setItem('user', JSON.stringify({id: data.user.id, name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '', email, role: userRole}));
            resolve([{id: data.user.id, role: userRole}, null]);
          });
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

        localStorage.setItem('user', JSON.stringify({id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.role}));
        resolve(null);
      } catch (error) {
        console.error('Transaction failed:', error);
        await this.supabase.rpc('rollback');
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

  public checkDuplicateAccount(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.supabase
        .from('users')
        .select()
        .eq('email', email)
        .then(({data}) => {
          resolve(data.length > 0);
        });
    });
  }

  public signOut(): Promise<{error: AuthError}> {
    localStorage.removeItem('user');
    return this.supabase.auth.signOut();
  }

  public verifyEmail(token: string, email: string): Promise<AuthResponse> {
    const params = {token, email, type: 'email'} as VerifyEmailOtpParams;
    return this.supabase.auth.verifyOtp(params);
  }

  public resendEmailVerification(email: string): Promise<AuthOtpResponse> {
    const params = {email, type: 'signup'} as ResendParams;
    return this.supabase.auth.resend(params);
  }

  public getCurrentSession(): Observable<AuthSession> {
    return this._currentSession.asObservable();
  }
}
